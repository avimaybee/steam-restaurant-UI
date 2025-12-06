"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Cart, CartItem } from "@/lib/cart-store";
import { toast } from "sonner";

interface CartContextType {
  cart: Cart | null;
  addToCart: (item: Omit<CartItem, "quantity">) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  deleteItem: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const res = await fetch("/api/cart");
      if (res.ok) {
        const data = await res.json();
        setCart(data);
      }
    } catch (error) {
      console.error("Failed to fetch cart", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (item: Omit<CartItem, "quantity">) => {
    try {
      // Optimistic update could go here, but for now let's wait for server
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "add", item }),
      });
      
      if (res.ok) {
        const updatedCart = await res.json();
        setCart(updatedCart);
        toast.success(`Added ${item.name} to cart`);
      } else {
        toast.error("Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error adding to cart", error);
      toast.error("Something went wrong");
    }
  };

  const removeFromCart = async (itemId: string) => {
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "remove", item: { id: itemId } }),
      });

      if (res.ok) {
        const updatedCart = await res.json();
        setCart(updatedCart);
        toast.success("Item quantity updated");
      }
    } catch (error) {
      console.error("Error removing from cart", error);
      toast.error("Failed to update cart");
    }
  };

  const deleteItem = async (itemId: string) => {
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", item: { id: itemId } }),
      });

      if (res.ok) {
        const updatedCart = await res.json();
        setCart(updatedCart);
        toast.success("Item removed from cart");
      }
    } catch (error) {
      console.error("Error deleting item", error);
      toast.error("Failed to remove item");
    }
  };

  const clearCart = async () => {
      try {
        const res = await fetch("/api/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "clear" }),
        });
        if (res.ok) {
            const updatedCart = await res.json();
            setCart(updatedCart);
            toast.success("Cart cleared");
        }
      } catch (error) {
          console.error("Error clearing cart", error);
      }
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, deleteItem, clearCart, isLoading }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

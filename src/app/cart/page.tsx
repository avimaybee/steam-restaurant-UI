"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useCart } from "@/context/cart-context";

export default function CartPage() {
    const { cart, addToCart, removeFromCart, deleteItem, isLoading } = useCart();
    const [promoCode, setPromoCode] = useState("");

    const cartItems = cart?.items || [];

    const updateQuantity = (item: any, delta: number) => {
        if (delta > 0) {
            addToCart({
                id: item.id,
                name: item.name,
                price: item.price,
                image: item.image
            });
        } else {
            removeFromCart(item.id);
        }
    };

    const removeItem = (id: string) => {
        deleteItem(id);
    };

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    if (isLoading) {
        return (
            <main className="min-h-screen bg-[#0A0A0A]">
                <Header />
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-white">Loading cart...</div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#0A0A0A]">
            <Header />

            {/* Hero */}
            <section className="relative pt-40 pb-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="container mx-auto px-6 lg:px-12 text-center"
                >
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <span className="w-8 h-px bg-[#D4AF37]/50" />
                        <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
                        <span className="w-8 h-px bg-[#D4AF37]/50" />
                    </div>
                    <h1 className="font-[family-name:var(--font-playfair)] text-4xl lg:text-5xl font-bold text-white mb-4">
                        Your Order
                    </h1>
                    <p className="text-gray-400">
                        {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
                    </p>
                </motion.div>
            </section>

            {/* Cart Content */}
            <section className="py-12">
                <div className="container mx-auto px-6 lg:px-12">
                    {cartItems.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <ShoppingBag className="w-16 h-16 text-gray-600 mx-auto mb-6" />
                            <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-white mb-4">
                                Your cart is empty
                            </h2>
                            <p className="text-gray-500 mb-8">
                                Discover our menu and add some delicious items
                            </p>
                            <Link href="/menu">
                                <Button className="bg-[#D4AF37] text-black hover:bg-[#E8C547]">
                                    Browse Menu
                                </Button>
                            </Link>
                        </motion.div>
                    ) : (
                        <div className="grid lg:grid-cols-3 gap-12">
                            {/* Cart Items */}
                            <div className="lg:col-span-2 space-y-4">
                                {cartItems.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Card className="p-4 bg-black border-white/5 flex gap-4">
                                            {/* Image */}
                                            <div className="relative w-24 h-24 flex-shrink-0">
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>

                                            {/* Details */}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-[family-name:var(--font-playfair)] text-lg text-white mb-1">
                                                    {item.name}
                                                </h3>
                                                <p className="text-gray-500 text-sm truncate">
                                                    {/* Description not in cart item currently, maybe add it? */}
                                                    {/* For now, just name */}
                                                </p>
                                                <span className="text-[#D4AF37] font-semibold mt-2 block">
                                                    ${item.price}
                                                </span>
                                            </div>

                                            {/* Quantity Controls */}
                                            <div className="flex flex-col items-end justify-between">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-gray-500 hover:text-red-500 h-8 w-8"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>

                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() => updateQuantity(item, -1)}
                                                        className="h-8 w-8 border-white/10 bg-transparent"
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </Button>
                                                    <span className="w-8 text-center text-white font-semibold">
                                                        {item.quantity}
                                                    </span>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() => updateQuantity(item, 1)}
                                                        className="h-8 w-8 border-white/10 bg-transparent"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </Button>
                                                </div>

                                                <span className="text-white font-semibold">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </span>
                                            </div>
                                        </Card>
                                    </motion.div>
                                ))}

                                {/* Add More Link */}
                                <Link href="/menu" className="block">
                                    <Card className="p-4 bg-transparent border-dashed border-white/10 hover:border-[#D4AF37]/50 transition-colors text-center">
                                        <span className="text-gray-500 text-sm">
                                            + Add more items from the menu
                                        </span>
                                    </Card>
                                </Link>
                            </div>

                            {/* Order Summary */}
                            <div className="lg:col-span-1">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <Card className="p-6 bg-black border-white/5 sticky top-24">
                                        <h2 className="font-[family-name:var(--font-playfair)] text-xl text-white mb-6">
                                            Order Summary
                                        </h2>

                                        {/* Promo Code */}
                                        <div className="flex gap-2 mb-6">
                                            <Input
                                                value={promoCode}
                                                onChange={(e) => setPromoCode(e.target.value)}
                                                placeholder="Promo code"
                                                className="bg-[#0A0A0A] border-white/10"
                                            />
                                            <Button variant="outline" className="border-white/10 bg-transparent shrink-0">
                                                Apply
                                            </Button>
                                        </div>

                                        <Separator className="bg-white/5 mb-6" />

                                        {/* Totals */}
                                        <div className="space-y-3">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-400">Subtotal</span>
                                                <span className="text-white">${subtotal.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-400">GST (10%)</span>
                                                <span className="text-white">${tax.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-400">Delivery</span>
                                                <span className="text-[#D4AF37]">Free</span>
                                            </div>
                                        </div>

                                        <Separator className="bg-white/5 my-6" />

                                        <div className="flex justify-between mb-6">
                                            <span className="text-lg font-semibold text-white">Total</span>
                                            <span className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#D4AF37]">
                                                ${total.toFixed(2)}
                                            </span>
                                        </div>

                                        <Link href="/checkout" className="block">
                                            <Button className="w-full bg-[#D4AF37] text-black hover:bg-[#E8C547] text-xs tracking-[0.15em] uppercase py-6">
                                                Proceed to Checkout
                                                <ArrowRight className="w-4 h-4 ml-2" />
                                            </Button>
                                        </Link>

                                        <p className="text-xs text-gray-500 text-center mt-4">
                                            Secure checkout powered by Stripe
                                        </p>
                                    </Card>
                                </motion.div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}

import { db } from "./firebase";
import { doc, getDoc, setDoc, deleteDoc, serverTimestamp, addDoc, collection } from "firebase/firestore";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Cart {
  items: CartItem[];
}

// In-memory fallback storage for when Firebase is unavailable
const memoryStore: Map<string, Cart> = new Map();
const memoryOrders: Record<string, unknown>[] = [];

export const getCart = async (sessionId: string): Promise<Cart> => {
  try {
    const ref = doc(db, "carts", sessionId);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      return { items: [] };
    }
    const data = snap.data();
    return {
      items: (data.items || []) as CartItem[],
    };
  } catch (error) {
    console.warn("Firebase unavailable, using in-memory storage:", error);
    return memoryStore.get(sessionId) || { items: [] };
  }
};

export const updateCart = async (sessionId: string, cart: Cart) => {
  try {
    const ref = doc(db, "carts", sessionId);
    await setDoc(ref, { items: cart.items, updatedAt: serverTimestamp() }, { merge: true });
  } catch (error) {
    console.warn("Firebase unavailable, using in-memory storage:", error);
    memoryStore.set(sessionId, cart);
  }
};

export const clearCart = async (sessionId: string) => {
  try {
    const ref = doc(db, "carts", sessionId);
    await deleteDoc(ref);
  } catch (error) {
    console.warn("Firebase unavailable, using in-memory storage:", error);
    memoryStore.delete(sessionId);
  }
};

export const saveOrder = async (order: Record<string, unknown>) => {
  try {
    await addDoc(collection(db, "orders"), {
      ...order,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.warn("Firebase unavailable, saving order locally:", error);
    memoryOrders.push({ ...order, createdAt: new Date().toISOString() });
    console.log("Order saved to memory:", order);
  }
};

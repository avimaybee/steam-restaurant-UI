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

export const getCart = async (sessionId: string): Promise<Cart> => {
  const ref = doc(db, "carts", sessionId);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    return { items: [] };
  }
  const data = snap.data();
  return {
    items: (data.items || []) as CartItem[],
  };
};

export const updateCart = async (sessionId: string, cart: Cart) => {
  const ref = doc(db, "carts", sessionId);
  await setDoc(ref, { items: cart.items, updatedAt: serverTimestamp() }, { merge: true });
};

export const clearCart = async (sessionId: string) => {
  const ref = doc(db, "carts", sessionId);
  await deleteDoc(ref);
};

export const saveOrder = async (order: Record<string, unknown>) => {
  await addDoc(collection(db, "orders"), {
    ...order,
    createdAt: serverTimestamp(),
  });
};

export const runtime = "edge";
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";

// In-memory cart storage for edge runtime (will reset on cold start)
// For production, use Cloudflare KV or D1
const cartStore = new Map<string, { items: CartItem[] }>();

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

// Helper to get or create a session ID
function getSessionId(req: NextRequest): string {
  return req.cookies.get("session_id")?.value || Math.random().toString(36).substring(2, 15);
}

function getCart(sessionId: string): { items: CartItem[] } {
  return cartStore.get(sessionId) || { items: [] };
}

function updateCart(sessionId: string, cart: { items: CartItem[] }): void {
  cartStore.set(sessionId, cart);
}

export async function GET(req: NextRequest) {
  const sessionId = getSessionId(req);
  const cart = getCart(sessionId);

  const response = NextResponse.json(cart);
  if (!req.cookies.get("session_id")) {
    response.cookies.set("session_id", sessionId, { path: "/", httpOnly: true });
  }
  return response;
}

export async function POST(req: NextRequest) {
  const sessionId = getSessionId(req);
  const body = await req.json();
  const { item, action } = body;

  const cart = getCart(sessionId);

  if (action === 'add') {
    const existingItem = cart.items.find((i) => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({ ...item, quantity: 1 });
    }
  } else if (action === 'remove') {
    const existingItem = cart.items.find((i) => i.id === item.id);
    if (existingItem) {
      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        cart.items = cart.items.filter((i) => i.id !== item.id);
      }
    }
  } else if (action === 'delete') {
    cart.items = cart.items.filter((i) => i.id !== item.id);
  } else if (action === 'clear') {
    cart.items = [];
  }

  updateCart(sessionId, cart);

  const response = NextResponse.json(cart);
  if (!req.cookies.get("session_id")) {
    response.cookies.set("session_id", sessionId, { path: "/", httpOnly: true });
  }
  return response;
}

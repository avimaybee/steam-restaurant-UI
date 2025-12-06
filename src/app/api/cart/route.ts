export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { getCart, updateCart } from "@/lib/cart-store";
import { cookies } from "next/headers";

// Helper to get or create a session ID
async function getSessionId() {
  const cookieStore = await cookies();
  let sessionId = cookieStore.get("session_id")?.value;
  if (!sessionId) {
    sessionId = Math.random().toString(36).substring(2, 15);
    // In a real app, we'd set this cookie in the response, but for this API route
    // we rely on the client to handle it or middleware. 
    // For simplicity here, we'll just return it if needed, but let's assume
    // the client/middleware handles session creation or we just use a header.
    // Actually, let's just use a simple header for this demo if cookie is missing,
    // or set it on the response.
  }
  return sessionId;
}

export async function GET(req: NextRequest) {
  const sessionId = req.cookies.get("session_id")?.value || (await getSessionId());
  const cart = await getCart(sessionId);

  const response = NextResponse.json(cart);
  if (!req.cookies.get("session_id")) {
    response.cookies.set("session_id", sessionId, { path: "/", httpOnly: true });
  }
  return response;
}

export async function POST(req: NextRequest) {
  const sessionId = req.cookies.get("session_id")?.value || (await getSessionId());
  const body = await req.json();
  const { item, action } = body;

  const cart = await getCart(sessionId);

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

  await updateCart(sessionId, cart);
  
  const response = NextResponse.json(cart);
  if (!req.cookies.get("session_id")) {
      response.cookies.set("session_id", sessionId, { path: "/", httpOnly: true });
  }
  return response;
}

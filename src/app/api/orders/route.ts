export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { saveOrder, clearCart } from "@/lib/cart-store";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { cart, customer, shipping, payment, totals, promoCode } = body;

    if (!cart || !customer || !shipping || !payment || !totals) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const order = {
      cart,
      customer,
      shipping,
      payment: { ...payment, cardNumber: "****" },
      totals,
      promoCode: promoCode || null,
    };

    await saveOrder(order);

    const sessionId = req.cookies.get("session_id")?.value;
    if (sessionId) {
      await clearCart(sessionId);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Order creation failed", error);
    return NextResponse.json({ error: "Unable to place order" }, { status: 500 });
  }
}

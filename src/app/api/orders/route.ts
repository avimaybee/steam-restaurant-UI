export const runtime = "edge";
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";

// In-memory order storage for edge runtime (will reset on cold start)
// For production, use Cloudflare D1 or external database
const orderStore: Record<string, unknown>[] = [];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { cart, customer, pickup, payment, totals, promoCode } = body;

    if (!cart || !customer || !payment || !totals) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const order = {
      id: `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
      cart,
      customer,
      pickup: pickup || null,
      payment: { ...payment, cardNumber: "****", cvv: "***" },
      totals,
      promoCode: promoCode || null,
      createdAt: new Date().toISOString(),
    };

    // Store order (in production, save to Cloudflare D1 or external DB)
    orderStore.push(order);
    console.log("Order placed:", order.id);

    return NextResponse.json({ success: true, orderId: order.id });
  } catch (error) {
    console.error("Order creation failed", error);
    return NextResponse.json({ error: "Unable to place order" }, { status: 500 });
  }
}

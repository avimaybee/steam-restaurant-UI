"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/cart-context";
import Image from "next/image";
import { toast } from "sonner";

const shippingOptions = [
  { id: "standard", label: "Standard", detail: "3-5 business days", cost: 8 },
  { id: "express", label: "Express", detail: "1-2 business days", cost: 18 },
];

const promoCodes: Record<string, { type: "percent" | "fixed"; value: number }> = {
  SAVE10: { type: "percent", value: 0.1 },
  WELCOME5: { type: "fixed", value: 5 },
};

const luhnCheck = (num: string) => {
  const digits = num.replace(/\D/g, "");
  let sum = 0;
  let shouldDouble = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits.charAt(i), 10);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
};

export default function CheckoutPage() {
  const { cart, isLoading, clearCart } = useCart();
  const items = cart?.items || [];

  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postal: "",
    country: "",
  });
  const [payment, setPayment] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    holder: "",
  });
  const [selectedShipping, setSelectedShipping] = useState(shippingOptions[0]);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);
  const discount = useMemo(() => {
    if (!appliedPromo) return 0;
    const promo = promoCodes[appliedPromo];
    if (!promo) return 0;
    if (promo.type === "percent") return subtotal * promo.value;
    return promo.value;
  }, [appliedPromo, subtotal]);
  const tax = useMemo(() => subtotal * 0.1, [subtotal]);
  const total = useMemo(() => subtotal - discount + tax + selectedShipping.cost, [subtotal, discount, tax, selectedShipping.cost]);

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (promoCodes[code]) {
      setAppliedPromo(code);
      toast.success("Promo applied");
    } else {
      toast.error("Promo code not valid");
    }
  };

  const validateForm = () => {
    const emailOk = /.+@.+\..+/.test(shippingInfo.email);
    const phoneOk = shippingInfo.phone.trim().length >= 8;
    const allFields = Object.values(shippingInfo).every((f) => f.trim().length > 1);
    const cardNumClean = payment.cardNumber.replace(/\s+/g, "");
    const cardOk = cardNumClean.length >= 13 && luhnCheck(cardNumClean);
    const expiryOk = /^\d{2}\/\d{2}$/.test(payment.expiry);
    const cvvOk = /^\d{3,4}$/.test(payment.cvv);
    return emailOk && phoneOk && allFields && cardOk && expiryOk && cvvOk && payment.holder.trim().length > 2;
  };

  const handleOrder = async () => {
    if (!items.length) {
      toast.error("Your cart is empty");
      return;
    }
    if (!validateForm()) {
      toast.error("Please complete all details correctly");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart: items,
          customer: shippingInfo,
          shipping: selectedShipping,
          payment,
          totals: { subtotal, discount, tax, shipping: selectedShipping.cost, total },
          promoCode: appliedPromo,
        }),
      });
      if (!res.ok) throw new Error("Order failed");
      toast.success("Order placed successfully");
      await clearCart();
    } catch (error) {
      toast.error("Unable to place order");
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#0B1524] text-white">
        <Header />
        <div className="flex items-center justify-center min-h-screen">Loading checkout...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0B1524] text-white">
      <Header />
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mb-10">
            <p className="text-sm tracking-[0.2em] uppercase text-[#7AB6FF]">Checkout</p>
            <h1 className="text-4xl lg:text-5xl font-semibold text-white mt-2">Complete your order</h1>
            <p className="text-gray-400 mt-3">Secure checkout with real-time totals, shipping choices, and promo codes.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-[#0F1C30] border border-white/10 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Shipping Information</h2>
                  <span className="text-xs text-gray-400">All fields required</span>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input placeholder="Full Name" value={shippingInfo.name} onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })} className="bg-[#0B1524] border-white/10" />
                  <Input placeholder="Email" value={shippingInfo.email} onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })} className="bg-[#0B1524] border-white/10" />
                  <Input placeholder="Phone" value={shippingInfo.phone} onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })} className="bg-[#0B1524] border-white/10" />
                  <Input placeholder="Country" value={shippingInfo.country} onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })} className="bg-[#0B1524] border-white/10" />
                  <Input placeholder="Street Address" value={shippingInfo.address} onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })} className="bg-[#0B1524] border-white/10 md:col-span-2" />
                  <Input placeholder="City" value={shippingInfo.city} onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })} className="bg-[#0B1524] border-white/10" />
                  <Input placeholder="State / Province" value={shippingInfo.state} onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })} className="bg-[#0B1524] border-white/10" />
                  <Input placeholder="Postal Code" value={shippingInfo.postal} onChange={(e) => setShippingInfo({ ...shippingInfo, postal: e.target.value })} className="bg-[#0B1524] border-white/10" />
                </div>
              </Card>

              <Card className="bg-[#0F1C30] border border-white/10 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Shipping Method</h2>
                </div>
                <div className="space-y-3">
                  {shippingOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setSelectedShipping(option)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl border transition ${
                        selectedShipping.id === option.id ? "border-[#7AB6FF] bg-[#132642]" : "border-white/10 bg-transparent"
                      }`}
                    >
                      <div>
                        <p className="text-sm font-semibold">{option.label}</p>
                        <p className="text-xs text-gray-400">{option.detail}</p>
                      </div>
                      <span className="text-sm text-[#7AB6FF]">${option.cost.toFixed(2)}</span>
                    </button>
                  ))}
                </div>
              </Card>

              <Card className="bg-[#0F1C30] border border-white/10 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Payment Details</h2>
                  <span className="text-xs text-gray-400">Card is validated locally</span>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input placeholder="Card Number" value={payment.cardNumber} onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })} className="bg-[#0B1524] border-white/10 md:col-span-2" />
                  <Input placeholder="Cardholder Name" value={payment.holder} onChange={(e) => setPayment({ ...payment, holder: e.target.value })} className="bg-[#0B1524] border-white/10 md:col-span-2" />
                  <Input placeholder="MM/YY" value={payment.expiry} onChange={(e) => setPayment({ ...payment, expiry: e.target.value })} className="bg-[#0B1524] border-white/10" />
                  <Input placeholder="CVV" value={payment.cvv} onChange={(e) => setPayment({ ...payment, cvv: e.target.value })} className="bg-[#0B1524] border-white/10" />
                </div>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="bg-[#0F1C30] border border-white/10 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Order Summary</h2>
                  <span className="text-xs text-gray-400">{items.length} items</span>
                </div>
                <div className="space-y-4 max-h-[320px] overflow-y-auto pr-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-3">
                      <div className="relative w-14 h-14 overflow-hidden rounded-md bg-[#0B1524]">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white truncate">{item.name}</p>
                        <p className="text-xs text-gray-400">Qty {item.quantity}</p>
                      </div>
                      <span className="text-sm text-white">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  {!items.length && <p className="text-sm text-gray-500">Your cart is empty.</p>}
                </div>

                <Separator className="my-4 bg-white/10" />

                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (10%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${selectedShipping.cost.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-[#7AB6FF]">
                      <span>Discount ({appliedPromo})</span>
                      <span>- ${discount.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                <Separator className="my-4 bg-white/10" />

                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-2xl font-bold text-[#7AB6FF]">${total.toFixed(2)}</span>
                </div>

                <div className="flex gap-2 mt-4">
                  <Input placeholder="Promo code" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} className="bg-[#0B1524] border-white/10" />
                  <Button variant="outline" className="border-white/20 text-[#7AB6FF] hover:border-[#7AB6FF]" onClick={handleApplyPromo}>
                    Apply
                  </Button>
                </div>

                <Button
                  className="w-full mt-6 bg-[#7AB6FF] text-black hover:bg-[#5ea6ff]"
                  onClick={handleOrder}
                  disabled={submitting || !items.length}
                >
                  {submitting ? "Placing order..." : "Place Order"}
                </Button>
                <p className="text-xs text-gray-500 mt-2">By placing this order you agree to our terms and privacy policy.</p>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

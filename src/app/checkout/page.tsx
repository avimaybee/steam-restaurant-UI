"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/cart-context";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { CreditCard, MapPin, Clock, Check, ShoppingBag, ArrowLeft, Shield } from "lucide-react";

const pickupTimes = [
  { id: "asap", label: "ASAP", detail: "~20-30 minutes" },
  { id: "30min", label: "In 30 mins", detail: "Pre-order" },
  { id: "1hour", label: "In 1 hour", detail: "Pre-order" },
  { id: "custom", label: "Custom time", detail: "Schedule" },
];

const promoCodes: Record<string, { type: "percent" | "fixed"; value: number }> = {
  SAVE10: { type: "percent", value: 0.1 },
  WELCOME5: { type: "fixed", value: 5 },
  STEAM20: { type: "percent", value: 0.2 },
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

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [payment, setPayment] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    holder: "",
  });
  const [selectedPickup, setSelectedPickup] = useState(pickupTimes[0]);
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
  const total = useMemo(() => subtotal - discount + tax, [subtotal, discount, tax]);

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (promoCodes[code]) {
      setAppliedPromo(code);
      toast.success("Promo code applied!", { description: `${code} discount activated` });
    } else {
      toast.error("Invalid promo code");
    }
  };

  const validateForm = () => {
    const emailOk = /.+@.+\..+/.test(customerInfo.email);
    const phoneOk = customerInfo.phone.trim().length >= 8;
    const nameOk = customerInfo.name.trim().length > 2;
    const cardNumClean = payment.cardNumber.replace(/\s+/g, "");
    const cardOk = cardNumClean.length >= 13 && luhnCheck(cardNumClean);
    const expiryOk = /^\d{2}\/\d{2}$/.test(payment.expiry);
    const cvvOk = /^\d{3,4}$/.test(payment.cvv);
    return emailOk && phoneOk && nameOk && cardOk && expiryOk && cvvOk && payment.holder.trim().length > 2;
  };

  const handleOrder = async () => {
    if (!items.length) {
      toast.error("Your cart is empty");
      return;
    }
    if (!validateForm()) {
      toast.error("Please complete all details correctly", {
        description: "Check your contact and payment information"
      });
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart: items,
          customer: customerInfo,
          pickup: selectedPickup,
          payment,
          totals: { subtotal, discount, tax, total },
          promoCode: appliedPromo,
        }),
      });
      if (!res.ok) throw new Error("Order failed");
      toast.success("Order placed successfully!", {
        description: "We'll have your food ready for pickup"
      });
      await clearCart();
    } catch {
      toast.error("Unable to place order", {
        description: "Please try again or call us directly"
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#050505]">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full"
          />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505]">
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-8 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-[#D4AF37]/5 to-transparent" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <Link href="/cart" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#D4AF37] transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to cart</span>
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <span className="text-xs tracking-[0.3em] uppercase text-[#D4AF37]">Secure Checkout</span>
          </div>
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl lg:text-5xl font-bold text-white mb-3">
            Complete Your Order
          </h1>
          <p className="text-gray-400 text-lg">
            Just a few details and your food will be ready for pickup
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Form Section */}
            <div className="lg:col-span-3 space-y-6">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative p-6 sm:p-8 bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 rounded-2xl"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">Contact Details</h2>
                    <p className="text-xs text-gray-500">For order updates</p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2 sm:col-span-2">
                    <Label className="text-gray-400 text-sm">Full Name *</Label>
                    <Input
                      placeholder="John Smith"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                      className="h-12 bg-white/5 border-white/10 focus:border-[#D4AF37] rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-400 text-sm">Email *</Label>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                      className="h-12 bg-white/5 border-white/10 focus:border-[#D4AF37] rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-400 text-sm">Phone *</Label>
                    <Input
                      placeholder="+61 400 000 000"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      className="h-12 bg-white/5 border-white/10 focus:border-[#D4AF37] rounded-lg"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Pickup Time */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="relative p-6 sm:p-8 bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 rounded-2xl"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">Pickup Time</h2>
                    <p className="text-xs text-gray-500">4/2257 Point Nepean Rd, Rye</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {pickupTimes.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setSelectedPickup(option)}
                      className={`relative p-4 rounded-xl border transition-all text-left ${selectedPickup.id === option.id
                          ? "border-[#D4AF37] bg-[#D4AF37]/10"
                          : "border-white/10 bg-white/5 hover:border-white/20"
                        }`}
                    >
                      {selectedPickup.id === option.id && (
                        <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#D4AF37] flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 text-black" />
                        </div>
                      )}
                      <p className="text-sm font-semibold text-white">{option.label}</p>
                      <p className="text-xs text-gray-400 mt-1">{option.detail}</p>
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Payment Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative p-6 sm:p-8 bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 rounded-2xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
                      <CreditCard className="w-4 h-4 text-[#D4AF37]" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-white">Payment</h2>
                      <p className="text-xs text-gray-500">Card details</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Shield className="w-3 h-3" />
                    <span>Secure</span>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2 sm:col-span-2">
                    <Label className="text-gray-400 text-sm">Card Number *</Label>
                    <Input
                      placeholder="4242 4242 4242 4242"
                      value={payment.cardNumber}
                      onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })}
                      className="h-12 bg-white/5 border-white/10 focus:border-[#D4AF37] rounded-lg font-mono"
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label className="text-gray-400 text-sm">Cardholder Name *</Label>
                    <Input
                      placeholder="JOHN SMITH"
                      value={payment.holder}
                      onChange={(e) => setPayment({ ...payment, holder: e.target.value })}
                      className="h-12 bg-white/5 border-white/10 focus:border-[#D4AF37] rounded-lg uppercase"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-400 text-sm">Expiry *</Label>
                    <Input
                      placeholder="MM/YY"
                      value={payment.expiry}
                      onChange={(e) => setPayment({ ...payment, expiry: e.target.value })}
                      className="h-12 bg-white/5 border-white/10 focus:border-[#D4AF37] rounded-lg font-mono"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-400 text-sm">CVV *</Label>
                    <Input
                      placeholder="123"
                      value={payment.cvv}
                      onChange={(e) => setPayment({ ...payment, cvv: e.target.value })}
                      className="h-12 bg-white/5 border-white/10 focus:border-[#D4AF37] rounded-lg font-mono"
                      maxLength={4}
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2"
            >
              <div className="sticky top-24">
                <div className="relative p-6 sm:p-8 bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 rounded-2xl overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#D4AF37_1px,_transparent_1px)] bg-[size:24px_24px]" />
                  </div>

                  <div className="relative">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-white">Order Summary</h2>
                      <span className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded">{items.length} items</span>
                    </div>

                    {/* Items */}
                    <div className="space-y-3 max-h-[280px] overflow-y-auto pr-2 mb-6">
                      {items.map((item) => (
                        <div key={item.id} className="flex items-center gap-3">
                          <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-white/5">
                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">{item.name}</p>
                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                          </div>
                          <span className="text-sm font-medium text-white">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                      {!items.length && (
                        <div className="text-center py-8">
                          <ShoppingBag className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                          <p className="text-sm text-gray-500">Your cart is empty</p>
                        </div>
                      )}
                    </div>

                    <Separator className="bg-white/10 mb-4" />

                    {/* Promo Code */}
                    <div className="flex gap-2 mb-4">
                      <Input
                        placeholder="Promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="h-10 bg-white/5 border-white/10 focus:border-[#D4AF37] rounded-lg text-sm"
                      />
                      <Button
                        variant="outline"
                        onClick={handleApplyPromo}
                        className="h-10 border-white/10 hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] text-sm px-4"
                      >
                        Apply
                      </Button>
                    </div>

                    {/* Totals */}
                    <div className="space-y-3 text-sm mb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Subtotal</span>
                        <span className="text-white">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">GST (10%)</span>
                        <span className="text-white">${tax.toFixed(2)}</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between text-green-400">
                          <span>Discount ({appliedPromo})</span>
                          <span>-${discount.toFixed(2)}</span>
                        </div>
                      )}
                    </div>

                    <Separator className="bg-white/10 mb-4" />

                    <div className="flex justify-between items-baseline mb-6">
                      <span className="text-lg text-white">Total</span>
                      <div className="text-right">
                        <span className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#D4AF37]">
                          ${total.toFixed(2)}
                        </span>
                        <p className="text-xs text-gray-500">AUD incl. GST</p>
                      </div>
                    </div>

                    <Button
                      className="w-full h-14 bg-[#D4AF37] text-black hover:bg-[#E8C547] text-sm tracking-[0.12em] uppercase font-semibold rounded-lg transition-all hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] disabled:opacity-50"
                      onClick={handleOrder}
                      disabled={submitting || !items.length}
                    >
                      {submitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                          className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                        />
                      ) : (
                        "Place Order"
                      )}
                    </Button>

                    <p className="text-xs text-gray-500 text-center mt-4">
                      By placing this order you agree to our terms of service
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

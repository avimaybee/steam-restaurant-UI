"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, UtensilsCrossed, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useCart } from "@/context/cart-context";

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function CartPage() {
    const { cart, addToCart, removeFromCart, deleteItem, isLoading } = useCart();
    const [promoCode, setPromoCode] = useState("");

    const cartItems = cart?.items || [];

    const updateQuantity = (item: { id: string; name: string; price: number; image: string }, delta: number) => {
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
                {/* Background Elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-[#D4AF37]/5 to-transparent" />
                    <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[120px]" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="container mx-auto px-6 lg:px-12 relative z-10"
                >
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center">
                                <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
                            </div>
                            <span className="text-xs tracking-[0.3em] uppercase text-[#D4AF37]">Your Order</span>
                        </div>
                        <h1 className="font-[family-name:var(--font-playfair)] text-4xl lg:text-6xl font-bold text-white mb-3">
                            Your Cart
                        </h1>
                        <p className="text-gray-400 text-lg">
                            {cartItems.length === 0
                                ? "Your cart is waiting to be filled with deliciousness"
                                : `${cartItems.length} ${cartItems.length === 1 ? "item" : "items"} ready for checkout`
                            }
                        </p>
                    </div>
                </motion.div>
            </section>

            {/* Cart Content */}
            <section className="py-8 pb-24">
                <div className="container mx-auto px-6 lg:px-12">
                    {cartItems.length === 0 ? (
                        /* Empty State */
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-20 max-w-md mx-auto"
                        >
                            <div className="relative w-32 h-32 mx-auto mb-8">
                                <div className="absolute inset-0 bg-[#D4AF37]/10 rounded-full blur-xl" />
                                <div className="relative w-full h-full rounded-full bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 flex items-center justify-center">
                                    <UtensilsCrossed className="w-12 h-12 text-[#D4AF37]/60" />
                                </div>
                            </div>
                            <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-white mb-4">
                                Your cart is empty
                            </h2>
                            <p className="text-gray-400 mb-8 leading-relaxed">
                                Explore our menu and discover exquisite Asian fusion dishes crafted with passion and tradition
                            </p>
                            <Link href="/menu">
                                <Button className="bg-[#D4AF37] text-black hover:bg-[#E8C547] text-sm tracking-[0.1em] uppercase px-8 py-6 shimmer">
                                    <Sparkles className="w-4 h-4 mr-2" />
                                    Explore Menu
                                </Button>
                            </Link>
                        </motion.div>
                    ) : (
                        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
                            {/* Cart Items */}
                            <motion.div
                                variants={staggerContainer}
                                initial="hidden"
                                animate="visible"
                                className="lg:col-span-3 space-y-4"
                            >
                                <AnimatePresence mode="popLayout">
                                    {cartItems.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            variants={itemVariants}
                                            layout
                                            exit={{ opacity: 0, x: -100 }}
                                            className="group"
                                        >
                                            <div className="relative p-5 bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 rounded-2xl overflow-hidden hover:border-[#D4AF37]/30 transition-all duration-500">
                                                {/* Glow on hover */}
                                                <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/5 to-[#D4AF37]/0 opacity-0 group-hover:opacity-100 transition-opacity" />

                                                <div className="relative flex gap-5">
                                                    {/* Image */}
                                                    <div className="relative w-28 h-28 flex-shrink-0 rounded-xl overflow-hidden">
                                                        <Image
                                                            src={item.image}
                                                            alt={item.name}
                                                            fill
                                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                                                    </div>

                                                    {/* Details */}
                                                    <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                                                        <div>
                                                            <h3 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-white mb-1">
                                                                {item.name}
                                                            </h3>
                                                            <span className="text-[#D4AF37] font-semibold text-lg">
                                                                ${item.price.toFixed(2)}
                                                            </span>
                                                        </div>

                                                        {/* Quantity Controls */}
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1">
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    onClick={() => updateQuantity(item, -1)}
                                                                    className="h-8 w-8 hover:bg-white/10 hover:text-white"
                                                                >
                                                                    <Minus className="w-3 h-3" />
                                                                </Button>
                                                                <span className="w-10 text-center text-white font-semibold">
                                                                    {item.quantity}
                                                                </span>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    onClick={() => updateQuantity(item, 1)}
                                                                    className="h-8 w-8 hover:bg-white/10 hover:text-white"
                                                                >
                                                                    <Plus className="w-3 h-3" />
                                                                </Button>
                                                            </div>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => removeItem(item.id)}
                                                                className="h-8 w-8 text-gray-500 hover:text-red-400 hover:bg-red-500/10"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </Button>
                                                        </div>
                                                    </div>

                                                    {/* Line Total */}
                                                    <div className="flex flex-col items-end justify-between py-1">
                                                        <span className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-white">
                                                            ${(item.price * item.quantity).toFixed(2)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>

                                {/* Add More Link */}
                                <motion.div variants={itemVariants}>
                                    <Link href="/menu" className="block group">
                                        <div className="p-6 border-2 border-dashed border-white/10 rounded-2xl hover:border-[#D4AF37]/30 transition-all text-center">
                                            <span className="text-gray-400 group-hover:text-[#D4AF37] transition-colors">
                                                + Add more items from the menu
                                            </span>
                                        </div>
                                    </Link>
                                </motion.div>
                            </motion.div>

                            {/* Order Summary */}
                            <motion.div
                                initial={{ opacity: 0, x: 40 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="lg:col-span-2"
                            >
                                <div className="sticky top-24">
                                    <div className="relative p-8 bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 rounded-2xl overflow-hidden">
                                        {/* Background Pattern */}
                                        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
                                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#D4AF37_1px,_transparent_1px)] bg-[size:24px_24px]" />
                                        </div>

                                        <div className="relative">
                                            <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-white mb-6">
                                                Order Summary
                                            </h2>

                                            {/* Promo Code */}
                                            <div className="flex gap-2 mb-6">
                                                <Input
                                                    value={promoCode}
                                                    onChange={(e) => setPromoCode(e.target.value)}
                                                    placeholder="Promo code"
                                                    className="h-12 bg-white/5 border-white/10 focus:border-[#D4AF37] rounded-lg"
                                                />
                                                <Button
                                                    variant="outline"
                                                    className="h-12 border-white/10 bg-transparent hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] px-6"
                                                >
                                                    Apply
                                                </Button>
                                            </div>

                                            <Separator className="bg-white/10 mb-6" />

                                            {/* Totals */}
                                            <div className="space-y-4 mb-6">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-400">Subtotal</span>
                                                    <span className="text-white font-medium">${subtotal.toFixed(2)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-400">GST (10%)</span>
                                                    <span className="text-white font-medium">${tax.toFixed(2)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-400">Pickup</span>
                                                    <span className="text-[#D4AF37] font-medium">Free</span>
                                                </div>
                                            </div>

                                            <Separator className="bg-white/10 mb-6" />

                                            <div className="flex justify-between items-baseline mb-8">
                                                <span className="text-lg text-white">Total</span>
                                                <div className="text-right">
                                                    <span className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#D4AF37]">
                                                        ${total.toFixed(2)}
                                                    </span>
                                                    <p className="text-xs text-gray-500 mt-1">AUD incl. GST</p>
                                                </div>
                                            </div>

                                            <Link href="/checkout" className="block">
                                                <Button className="w-full h-14 bg-[#D4AF37] text-black hover:bg-[#E8C547] text-sm tracking-[0.12em] uppercase font-semibold rounded-lg transition-all hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                                                    Proceed to Checkout
                                                    <ArrowRight className="w-4 h-4 ml-2" />
                                                </Button>
                                            </Link>

                                            <p className="text-xs text-gray-500 text-center mt-4">
                                                Secure checkout • Pickup at Rye
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}

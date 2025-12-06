"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Gift, CreditCard, Mail, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { toast } from "sonner";

const giftCardOptions = [
    { value: 50, popular: false },
    { value: 100, popular: true },
    { value: 150, popular: false },
    { value: 200, popular: false },
    { value: 250, popular: false },
    { value: 500, popular: false },
];

const features = [
    "Valid for 3 years from purchase",
    "Redeemable for dine-in and takeaway",
    "Beautifully designed digital card",
    "Instant email delivery",
];

export default function GiftCardsPage() {
    const [selectedAmount, setSelectedAmount] = useState(100);
    const [customAmount, setCustomAmount] = useState("");
    const [isCustom, setIsCustom] = useState(false);
    const [formData, setFormData] = useState({
        recipientName: "",
        recipientEmail: "",
        senderName: "",
        message: "",
    });

    const finalAmount = isCustom ? Number(customAmount) || 0 : selectedAmount;

    const handlePurchase = () => {
        if (finalAmount < 25) {
            toast.error("Minimum amount is $25");
            return;
        }
        toast.success("Gift card purchased!", {
            description: `A $${finalAmount} gift card will be sent to ${formData.recipientEmail}`,
        });
    };

    return (
        <main className="min-h-screen bg-[#0A0A0A]">
            <Header />

            {/* Hero */}
            <section className="relative pt-28 pb-12 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-[#0A0A0A]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,_rgba(212,175,55,0.1)_0%,_transparent_70%)] blur-3xl" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="container mx-auto px-6 lg:px-12 text-center relative z-10"
                >
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <span className="w-8 h-px bg-[#D4AF37]/50" />
                        <Gift className="w-5 h-5 text-[#D4AF37]" />
                        <span className="w-8 h-px bg-[#D4AF37]/50" />
                    </div>
                    <h1 className="font-[family-name:var(--font-playfair)] text-5xl lg:text-7xl font-bold text-white mb-2">
                        Gift Cards
                    </h1>
                    <p className="text-gray-400 text-lg max-w-md mx-auto">
                        Give the gift of an unforgettable culinary experience
                    </p>
                </motion.div>
            </section>

            {/* Gift Card Builder */}
            <section className="py-12">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        {/* Preview Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="lg:sticky lg:top-24"
                        >
                            <div className="relative aspect-[1.6/1] bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border border-[#D4AF37]/30 p-8 overflow-hidden">
                                {/* Background Pattern */}
                                <div className="absolute inset-0 opacity-5">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#D4AF37_1px,_transparent_1px)] bg-[size:20px_20px]" />
                                </div>

                                {/* Logo */}
                                <div className="flex items-center gap-2 mb-auto">
                                    <svg className="w-6 h-6 text-[#D4AF37]" viewBox="0 0 48 48" fill="none">
                                        <path
                                            d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    <span className="font-[family-name:var(--font-playfair)] font-bold tracking-[0.15em] uppercase text-white">
                                        Steam
                                    </span>
                                </div>

                                {/* Amount */}
                                <div className="absolute bottom-8 left-8">
                                    <span className="text-xs tracking-[0.2em] uppercase text-[#D4AF37] block mb-1">
                                        Gift Card
                                    </span>
                                    <span className="font-[family-name:var(--font-playfair)] text-5xl font-bold text-white">
                                        ${finalAmount}
                                    </span>
                                </div>

                                {/* Recipient */}
                                <div className="absolute bottom-8 right-8 text-right">
                                    <span className="text-xs text-gray-500 block">For</span>
                                    <span className="text-white">
                                        {formData.recipientName || "Recipient Name"}
                                    </span>
                                </div>

                                {/* Decorative Corner */}
                                <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-[#D4AF37]/50" />
                                <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-[#D4AF37]/50" />
                            </div>

                            {/* Features */}
                            <div className="mt-8 grid grid-cols-2 gap-4">
                                {features.map((feature) => (
                                    <div key={feature} className="flex items-center gap-2 text-sm text-gray-400">
                                        <Check className="w-4 h-4 text-[#D4AF37]" />
                                        {feature}
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <Card className="p-8 bg-black border-white/5">
                                {/* Amount Selection */}
                                <div className="mb-8">
                                    <h3 className="text-lg font-semibold text-white mb-4">Select Amount</h3>
                                    <div className="grid grid-cols-3 gap-3">
                                        {giftCardOptions.map((option) => (
                                            <motion.button
                                                key={option.value}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => {
                                                    setSelectedAmount(option.value);
                                                    setIsCustom(false);
                                                }}
                                                className={`relative p-4 border text-center transition-all ${!isCustom && selectedAmount === option.value
                                                        ? "border-[#D4AF37] bg-[#D4AF37]/10"
                                                        : "border-white/10 hover:border-white/30"
                                                    }`}
                                            >
                                                {option.popular && (
                                                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[10px] bg-[#D4AF37] text-black px-2 py-0.5 uppercase tracking-wider">
                                                        Popular
                                                    </span>
                                                )}
                                                <span className="text-xl font-semibold text-white">${option.value}</span>
                                            </motion.button>
                                        ))}
                                    </div>

                                    {/* Custom Amount */}
                                    <div className="mt-4">
                                        <button
                                            onClick={() => setIsCustom(true)}
                                            className={`w-full p-4 border text-left transition-all ${isCustom
                                                    ? "border-[#D4AF37] bg-[#D4AF37]/10"
                                                    : "border-white/10 hover:border-white/30"
                                                }`}
                                        >
                                            <span className="text-sm text-gray-400">Custom Amount</span>
                                            {isCustom && (
                                                <div className="mt-2 flex items-center gap-2">
                                                    <span className="text-xl text-white">$</span>
                                                    <Input
                                                        type="number"
                                                        value={customAmount}
                                                        onChange={(e) => setCustomAmount(e.target.value)}
                                                        className="bg-transparent border-none text-xl text-white p-0 focus-visible:ring-0"
                                                        placeholder="Enter amount"
                                                        min={25}
                                                        autoFocus
                                                    />
                                                </div>
                                            )}
                                        </button>
                                        <p className="text-xs text-gray-500 mt-2">Minimum $25</p>
                                    </div>
                                </div>

                                {/* Recipient Details */}
                                <div className="space-y-4 mb-8">
                                    <h3 className="text-lg font-semibold text-white">Recipient Details</h3>
                                    <div className="space-y-2">
                                        <Label className="text-gray-400">Recipient Name *</Label>
                                        <Input
                                            value={formData.recipientName}
                                            onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                                            className="bg-[#0A0A0A] border-white/10 focus:border-[#D4AF37]"
                                            placeholder="Jane Doe"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-gray-400">Recipient Email *</Label>
                                        <Input
                                            type="email"
                                            value={formData.recipientEmail}
                                            onChange={(e) => setFormData({ ...formData, recipientEmail: e.target.value })}
                                            className="bg-[#0A0A0A] border-white/10 focus:border-[#D4AF37]"
                                            placeholder="jane@example.com"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-gray-400">Your Name</Label>
                                        <Input
                                            value={formData.senderName}
                                            onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                                            className="bg-[#0A0A0A] border-white/10 focus:border-[#D4AF37]"
                                            placeholder="John Smith"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-gray-400">Personal Message</Label>
                                        <textarea
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="w-full min-h-[100px] p-3 bg-[#0A0A0A] border border-white/10 focus:border-[#D4AF37] text-white placeholder:text-gray-600 outline-none resize-none"
                                            placeholder="Add a personal message..."
                                        />
                                    </div>
                                </div>

                                {/* Purchase Button */}
                                <Button
                                    onClick={handlePurchase}
                                    disabled={!formData.recipientName || !formData.recipientEmail || finalAmount < 25}
                                    className="w-full bg-[#D4AF37] text-black hover:bg-[#E8C547] text-xs tracking-[0.15em] uppercase py-6"
                                >
                                    <CreditCard className="w-4 h-4 mr-2" />
                                    Purchase Gift Card — ${finalAmount}
                                </Button>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

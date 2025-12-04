"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Clock, Users, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { toast } from "sonner";

const timeSlots = [
    "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
    "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM"
];

const guestOptions = [1, 2, 3, 4, 5, 6, 7, 8];

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
};

export default function ReservationsPage() {
    const [step, setStep] = useState(1);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [selectedGuests, setSelectedGuests] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        notes: "",
    });

    // Generate next 14 days
    const dates = Array.from({ length: 14 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i);
        return date;
    });

    const handleSubmit = () => {
        toast.success("Reservation Confirmed!", {
            description: `We'll see you on ${selectedDate?.toLocaleDateString()} at ${selectedTime}`,
        });
        // Reset form
        setStep(1);
        setSelectedDate(null);
        setSelectedTime(null);
        setSelectedGuests(null);
        setFormData({ name: "", email: "", phone: "", notes: "" });
    };

    return (
        <main className="min-h-screen bg-[#0A0A0A]">
            <Header />

            {/* Hero */}
            <section className="relative pt-40 pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-[#0A0A0A]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,_rgba(212,175,55,0.1)_0%,_transparent_70%)] blur-3xl" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="container mx-auto px-6 lg:px-12 text-center relative z-10"
                >
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <span className="w-8 h-px bg-[#D4AF37]/50" />
                        <div className="w-2 h-2 bg-[#D4AF37] rotate-45" />
                        <span className="w-8 h-px bg-[#D4AF37]/50" />
                    </div>
                    <h1 className="font-[family-name:var(--font-playfair)] text-5xl lg:text-7xl font-bold text-white mb-4">
                        Reservations
                    </h1>
                    <p className="text-gray-400 text-lg max-w-md mx-auto">
                        Secure your table for an unforgettable dining experience
                    </p>
                </motion.div>
            </section>

            {/* Progress Steps */}
            <section className="py-8">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="flex items-center justify-center gap-4">
                        {[1, 2, 3].map((s) => (
                            <div key={s} className="flex items-center gap-4">
                                <motion.div
                                    animate={{
                                        backgroundColor: step >= s ? "#D4AF37" : "transparent",
                                        borderColor: step >= s ? "#D4AF37" : "rgba(255,255,255,0.2)",
                                    }}
                                    className="w-10 h-10 rounded-full border flex items-center justify-center"
                                >
                                    {step > s ? (
                                        <Check className="w-5 h-5 text-black" />
                                    ) : (
                                        <span className={`text-sm font-semibold ${step >= s ? "text-black" : "text-gray-500"}`}>
                                            {s}
                                        </span>
                                    )}
                                </motion.div>
                                {s < 3 && (
                                    <div className={`w-16 h-px ${step > s ? "bg-[#D4AF37]" : "bg-white/10"}`} />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center gap-20 mt-4">
                        <span className={`text-xs tracking-wider uppercase ${step >= 1 ? "text-white" : "text-gray-500"}`}>Date & Time</span>
                        <span className={`text-xs tracking-wider uppercase ${step >= 2 ? "text-white" : "text-gray-500"}`}>Party Size</span>
                        <span className={`text-xs tracking-wider uppercase ${step >= 3 ? "text-white" : "text-gray-500"}`}>Details</span>
                    </div>
                </div>
            </section>

            {/* Reservation Form */}
            <section className="py-12">
                <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
                    {/* Step 1: Date & Time */}
                    {step === 1 && (
                        <motion.div
                            variants={fadeInUp}
                            initial="hidden"
                            animate="visible"
                            className="space-y-12"
                        >
                            {/* Date Selection */}
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <CalendarDays className="w-5 h-5 text-[#D4AF37]" />
                                    <h3 className="text-lg font-semibold text-white">Select Date</h3>
                                </div>
                                <div className="grid grid-cols-7 gap-2">
                                    {dates.map((date) => (
                                        <motion.button
                                            key={date.toISOString()}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setSelectedDate(date)}
                                            className={`p-3 border text-center transition-all ${selectedDate?.toDateString() === date.toDateString()
                                                    ? "border-[#D4AF37] bg-[#D4AF37]/10"
                                                    : "border-white/10 hover:border-white/30"
                                                }`}
                                        >
                                            <span className="block text-[10px] uppercase text-gray-500">
                                                {date.toLocaleDateString("en", { weekday: "short" })}
                                            </span>
                                            <span className="block text-lg font-semibold text-white">
                                                {date.getDate()}
                                            </span>
                                            <span className="block text-[10px] uppercase text-gray-500">
                                                {date.toLocaleDateString("en", { month: "short" })}
                                            </span>
                                        </motion.button>
                                    ))}
                                </div>
                            </div>

                            {/* Time Selection */}
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <Clock className="w-5 h-5 text-[#D4AF37]" />
                                    <h3 className="text-lg font-semibold text-white">Select Time</h3>
                                </div>
                                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                                    {timeSlots.map((time) => (
                                        <motion.button
                                            key={time}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setSelectedTime(time)}
                                            className={`p-3 border text-sm transition-all ${selectedTime === time
                                                    ? "border-[#D4AF37] bg-[#D4AF37]/10 text-white"
                                                    : "border-white/10 text-gray-400 hover:border-white/30 hover:text-white"
                                                }`}
                                        >
                                            {time}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <Button
                                    onClick={() => setStep(2)}
                                    disabled={!selectedDate || !selectedTime}
                                    className="bg-[#D4AF37] text-black hover:bg-[#E8C547] text-xs tracking-[0.15em] uppercase px-8"
                                >
                                    Continue
                                    <ChevronRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 2: Party Size */}
                    {step === 2 && (
                        <motion.div
                            variants={fadeInUp}
                            initial="hidden"
                            animate="visible"
                            className="space-y-12"
                        >
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <Users className="w-5 h-5 text-[#D4AF37]" />
                                    <h3 className="text-lg font-semibold text-white">Party Size</h3>
                                </div>
                                <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                                    {guestOptions.map((num) => (
                                        <motion.button
                                            key={num}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setSelectedGuests(num)}
                                            className={`p-4 border text-center transition-all ${selectedGuests === num
                                                    ? "border-[#D4AF37] bg-[#D4AF37]/10"
                                                    : "border-white/10 hover:border-white/30"
                                                }`}
                                        >
                                            <span className="block text-2xl font-semibold text-white">{num}</span>
                                            <span className="block text-[10px] uppercase text-gray-500">
                                                {num === 1 ? "Guest" : "Guests"}
                                            </span>
                                        </motion.button>
                                    ))}
                                </div>
                                <p className="text-sm text-gray-500 mt-4">
                                    For parties larger than 8, please call us at +61 (3) 9123 4567
                                </p>
                            </div>

                            <div className="flex justify-between">
                                <Button
                                    variant="ghost"
                                    onClick={() => setStep(1)}
                                    className="text-gray-400"
                                >
                                    <ChevronLeft className="w-4 h-4 mr-2" />
                                    Back
                                </Button>
                                <Button
                                    onClick={() => setStep(3)}
                                    disabled={!selectedGuests}
                                    className="bg-[#D4AF37] text-black hover:bg-[#E8C547] text-xs tracking-[0.15em] uppercase px-8"
                                >
                                    Continue
                                    <ChevronRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 3: Contact Details */}
                    {step === 3 && (
                        <motion.div
                            variants={fadeInUp}
                            initial="hidden"
                            animate="visible"
                            className="space-y-8"
                        >
                            {/* Reservation Summary */}
                            <Card className="p-6 bg-black border-[#D4AF37]/30">
                                <h3 className="text-sm font-semibold text-[#D4AF37] uppercase tracking-wider mb-4">
                                    Reservation Summary
                                </h3>
                                <div className="grid sm:grid-cols-3 gap-4 text-center">
                                    <div>
                                        <span className="text-gray-500 text-sm">Date</span>
                                        <p className="text-white font-semibold">
                                            {selectedDate?.toLocaleDateString("en", {
                                                weekday: "short",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500 text-sm">Time</span>
                                        <p className="text-white font-semibold">{selectedTime}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500 text-sm">Guests</span>
                                        <p className="text-white font-semibold">{selectedGuests} {selectedGuests === 1 ? "Guest" : "Guests"}</p>
                                    </div>
                                </div>
                            </Card>

                            {/* Contact Form */}
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-gray-400">Full Name *</Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="bg-black border-white/10 focus:border-[#D4AF37]"
                                        placeholder="John Smith"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-gray-400">Email *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="bg-black border-white/10 focus:border-[#D4AF37]"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="text-gray-400">Phone *</Label>
                                    <Input
                                        id="phone"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="bg-black border-white/10 focus:border-[#D4AF37]"
                                        placeholder="+61 400 000 000"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="notes" className="text-gray-400">Special Requests</Label>
                                    <Input
                                        id="notes"
                                        value={formData.notes}
                                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                        className="bg-black border-white/10 focus:border-[#D4AF37]"
                                        placeholder="Allergies, celebrations, etc."
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <Button
                                    variant="ghost"
                                    onClick={() => setStep(2)}
                                    className="text-gray-400"
                                >
                                    <ChevronLeft className="w-4 h-4 mr-2" />
                                    Back
                                </Button>
                                <Button
                                    onClick={handleSubmit}
                                    disabled={!formData.name || !formData.email || !formData.phone}
                                    className="bg-[#D4AF37] text-black hover:bg-[#E8C547] text-xs tracking-[0.15em] uppercase px-8"
                                >
                                    Confirm Reservation
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}

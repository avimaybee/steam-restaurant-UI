"use client";

import { Assets } from "@/lib/assets";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Send, ArrowUpRight, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { toast } from "sonner";

const contactInfo = [
    {
        icon: MapPin,
        title: "Visit Us",
        details: ["4/2257 Point Nepean Rd", "Rye VIC 3941"],
        accent: "Opposite Rye Beach",
    },
    {
        icon: Phone,
        title: "Call Us",
        details: ["(03) 5985 7700"],
        accent: "Takeaway & Reservations",
    },
    {
        icon: Mail,
        title: "Email Us",
        details: ["Steaminrye@gmail.com"],
        accent: "We reply within 24 hours",
    },
    {
        icon: Clock,
        title: "Opening Hours",
        details: ["Tue-Fri: 2:30pm - 10pm", "Sat-Sun: 12pm - late"],
        accent: "Closed Mondays",
    },
];

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.3 },
    },
};

// fadeInUp removed (unused) to satisfy linter

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        await new Promise((r) => setTimeout(r, 1500));
        toast.success("Message sent!", {
            description: "We'll get back to you within 24 hours.",
        });
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
        setIsSubmitting(false);
    };

    return (
        <main className="min-h-screen bg-[#050505] overflow-hidden">
            <Header />

            {/* Hero Section with Background */}
            <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden pt-32">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src={Assets.interior.decor}
                        alt="Restaurant interior"
                        fill
                        className="object-cover"
                        style={{ filter: "brightness(0.25) saturate(0.8)" }}
                        priority
                    />
                </div>

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#050505_80%)]" />

                {/* Decorative Elements */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#D4AF37]/8 rounded-full blur-[80px]" />

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative z-10 text-center px-6 max-w-3xl mx-auto"
                >
                    {/* Decorative Line */}
                    <div className="flex items-center justify-center gap-6 mb-8">
                        <motion.span
                            initial={{ width: 0 }}
                            animate={{ width: 60 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="h-px bg-gradient-to-r from-transparent to-[#D4AF37]"
                        />
                        <Waves className="w-5 h-5 text-[#D4AF37]" />
                        <motion.span
                            initial={{ width: 0 }}
                            animate={{ width: 60 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="h-px bg-gradient-to-l from-transparent to-[#D4AF37]"
                        />
                    </div>

                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-[#D4AF37] text-xs tracking-[0.35em] uppercase font-medium block mb-4"
                    >
                        Rye Beach • Mornington Peninsula
                    </motion.span>

                    <h1 className="font-[family-name:var(--font-playfair)] text-5xl sm:text-6xl lg:text-8xl font-bold text-white mb-6 leading-[0.9]">
                        Get in
                        <span className="block italic font-normal text-[#D4AF37]">Touch</span>
                    </h1>

                    <p className="text-gray-400 text-lg sm:text-xl max-w-xl mx-auto leading-relaxed">
                        Whether it&apos;s a question, reservation, or just to say hello —
                        we&apos;re here for you.
                    </p>
                </motion.div>
            </section>

            {/* Contact Cards */}
            <section className="relative py-24 -mt-20">
                <div className="container mx-auto px-6 lg:px-12">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {contactInfo.map((item) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                                className="group relative"
                            >
                                {/* Card */}
                                <div className="relative h-full p-8 bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 group-hover:border-[#D4AF37]/40">
                                    {/* Glow Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/0 to-[#D4AF37]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    {/* Icon */}
                                    <div className="relative">
                                        <div className="w-14 h-14 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center mb-6 group-hover:bg-[#D4AF37]/20 transition-colors">
                                            <item.icon className="w-6 h-6 text-[#D4AF37]" />
                                        </div>

                                        <h3 className="text-xs tracking-[0.2em] uppercase text-[#D4AF37] font-medium mb-3">
                                            {item.title}
                                        </h3>

                                        <div className="space-y-1 mb-4">
                                            {item.details.map((detail) => (
                                                <p key={detail} className="text-white text-lg font-medium">
                                                    {detail}
                                                </p>
                                            ))}
                                        </div>

                                        <p className="text-gray-500 text-sm">
                                            {item.accent}
                                        </p>
                                    </div>

                                    {/* Corner Decoration */}
                                    <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-[#D4AF37]/20 rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Main Content: Map + Form */}
            <section className="py-16">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
                        {/* Map Side */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="lg:col-span-2 relative"
                        >
                            {/* Map Container */}
                            <div className="relative aspect-[4/5] lg:aspect-auto lg:h-full min-h-[500px] rounded-2xl overflow-hidden border border-white/10">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3138.4!2d144.8326!3d-38.3731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad5f5c6d1e16d0b%3A0x2e2f7c7b9f2f7e9d!2s2257%20Point%20Nepean%20Rd%2C%20Rye%20VIC%203941%2C%20Australia!5e0!3m2!1sen!2sus!4v1"
                                    className="absolute inset-0 w-full h-full grayscale invert-[0.88] contrast-[0.9] opacity-80"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                />

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/30 pointer-events-none" />

                                {/* Location Badge */}
                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="bg-[#050505]/90 backdrop-blur-xl border border-white/10 rounded-xl p-5">
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-[#D4AF37] flex items-center justify-center flex-shrink-0">
                                                <MapPin className="w-5 h-5 text-black" />
                                            </div>
                                            <div>
                                                <p className="text-white font-medium">Steam Restaurant</p>
                                                <p className="text-gray-400 text-sm">4/2257 Point Nepean Rd, Rye</p>
                                                <Link
                                                    href="https://maps.google.com/?q=2257+Point+Nepean+Rd+Rye+VIC+3941"
                                                    target="_blank"
                                                    className="inline-flex items-center gap-1 text-[#D4AF37] text-sm mt-2 hover:underline"
                                                >
                                                    Get Directions
                                                    <ArrowUpRight className="w-3 h-3" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Form Side */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="lg:col-span-3"
                        >
                            <div className="relative p-8 sm:p-10 bg-gradient-to-b from-white/[0.06] to-transparent border border-white/10 rounded-2xl">
                                {/* Background Pattern */}
                                <div className="absolute inset-0 opacity-[0.02] pointer-events-none rounded-2xl overflow-hidden">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#D4AF37_1px,_transparent_1px)] bg-[size:32px_32px]" />
                                </div>

                                <div className="relative">
                                    <span className="text-[#D4AF37] text-xs tracking-[0.25em] uppercase font-medium">
                                        Send a Message
                                    </span>
                                    <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl text-white mt-2 mb-3">
                                        We&apos;d Love to Hear
                                        <span className="italic text-[#D4AF37]"> From You</span>
                                    </h2>
                                    <p className="text-gray-400 mb-10 max-w-md">
                                        Have a question about our menu, want to book a private event, or just want to say hi? We&apos;re all ears.
                                    </p>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid sm:grid-cols-2 gap-5">
                                            <div className="space-y-2">
                                                <Label htmlFor="name" className="text-gray-300 text-sm">Your Name *</Label>
                                                <Input
                                                    id="name"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className="h-12 bg-white/5 border-white/10 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 rounded-lg text-white placeholder:text-gray-600"
                                                    placeholder="John Smith"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email" className="text-gray-300 text-sm">Email Address *</Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="h-12 bg-white/5 border-white/10 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 rounded-lg text-white placeholder:text-gray-600"
                                                    placeholder="john@example.com"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="grid sm:grid-cols-2 gap-5">
                                            <div className="space-y-2">
                                                <Label htmlFor="phone" className="text-gray-300 text-sm">Phone Number</Label>
                                                <Input
                                                    id="phone"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    className="h-12 bg-white/5 border-white/10 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 rounded-lg text-white placeholder:text-gray-600"
                                                    placeholder="+61 400 000 000"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="subject" className="text-gray-300 text-sm">Subject *</Label>
                                                <Input
                                                    id="subject"
                                                    value={formData.subject}
                                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                                    className="h-12 bg-white/5 border-white/10 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 rounded-lg text-white placeholder:text-gray-600"
                                                    placeholder="General Inquiry"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="message" className="text-gray-300 text-sm">Your Message *</Label>
                                            <textarea
                                                id="message"
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                className="w-full min-h-[160px] p-4 bg-white/5 border border-white/10 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 text-white placeholder:text-gray-600 outline-none resize-none rounded-lg transition-all"
                                                placeholder="Tell us what's on your mind..."
                                                required
                                            />
                                        </div>

                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full h-14 bg-[#D4AF37] text-black hover:bg-[#E8C547] text-sm tracking-[0.12em] uppercase font-semibold rounded-lg transition-all hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]"
                                        >
                                            {isSubmitting ? (
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                                    className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                                                />
                                            ) : (
                                                <>
                                                    Send Message
                                                    <Send className="w-4 h-4 ml-2" />
                                                </>
                                            )}
                                        </Button>

                                        <p className="text-center text-gray-500 text-xs">
                                            We typically respond within 24 hours during business hours.
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/5 via-transparent to-[#D4AF37]/5" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />

                <div className="container mx-auto px-6 lg:px-12 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center max-w-2xl mx-auto"
                    >
                        <h3 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl text-white mb-4">
                            Ready to dine with us?
                        </h3>
                        <p className="text-gray-400 mb-8">
                            Book your table now and experience the best of modern Asian fusion cuisine.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/reservations">
                                <Button className="bg-[#D4AF37] text-black hover:bg-[#E8C547] text-xs tracking-[0.15em] uppercase px-8 py-6">
                                    Make a Reservation
                                </Button>
                            </Link>
                            <Link href="tel:0359857700">
                                <Button variant="outline" className="border-white/20 text-white hover:border-[#D4AF37] hover:text-[#D4AF37] text-xs tracking-[0.15em] uppercase px-8 py-6">
                                    Call (03) 5985 7700
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

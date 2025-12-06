"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { toast } from "sonner";

const contactInfo = [
    {
        icon: MapPin,
        title: "Visit Us",
        details: ["123 Culinary Avenue", "Melbourne VIC 3000"],
    },
    {
        icon: Phone,
        title: "Call Us",
        details: ["+61 (3) 9123 4567", "Reservations: Ext. 1"],
    },
    {
        icon: Mail,
        title: "Email Us",
        details: ["hello@steam.restaurant", "events@steam.restaurant"],
    },
    {
        icon: Clock,
        title: "Opening Hours",
        details: ["Tue-Thu: 5:30pm - 10pm", "Fri-Sat: 5:30pm - 11pm", "Sun: 5:30pm - 9pm"],
    },
];

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
};

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

        // Simulate submission
        await new Promise((r) => setTimeout(r, 1500));

        toast.success("Message sent!", {
            description: "We'll get back to you within 24 hours.",
        });

        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
        setIsSubmitting(false);
    };

    return (
        <main className="min-h-screen bg-[#0A0A0A]">
            <Header />

            {/* Hero */}
            <section className="relative pt-28 pb-12">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,_rgba(212,175,55,0.08)_0%,_transparent_70%)] blur-3xl" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="container mx-auto px-6 lg:px-12 text-center relative z-10"
                >
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <span className="w-8 h-px bg-[#D4AF37]/50" />
                        <div className="w-2 h-2 bg-[#D4AF37] rotate-45" />
                        <span className="w-8 h-px bg-[#D4AF37]/50" />
                    </div>
                    <h1 className="font-[family-name:var(--font-playfair)] text-5xl lg:text-7xl font-bold text-white mb-2">
                        Get in Touch
                    </h1>
                    <p className="text-gray-400 text-lg max-w-md mx-auto">
                        We&apos;d love to hear from you. Reach out with any questions or inquiries.
                    </p>
                </motion.div>
            </section>

            {/* Contact Info Cards */}
            <section className="py-12">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {contactInfo.map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="p-6 bg-black border-white/5 hover:border-[#D4AF37]/30 transition-all h-full">
                                    <item.icon className="w-6 h-6 text-[#D4AF37] mb-4" />
                                    <h3 className="text-xs tracking-[0.2em] uppercase text-[#D4AF37] mb-3">
                                        {item.title}
                                    </h3>
                                    {item.details.map((detail) => (
                                        <p key={detail} className="text-gray-400 text-sm">
                                            {detail}
                                        </p>
                                    ))}
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Map & Form */}
            <section className="py-12">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Map */}
                        <motion.div
                            variants={fadeInUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="relative aspect-square lg:aspect-auto lg:h-full min-h-[400px] bg-black border border-white/5 overflow-hidden"
                        >
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.9537353!3d-37.8162791!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0xb6899234e561db11!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1"
                                className="absolute inset-0 w-full h-full grayscale invert-[0.85] contrast-[0.85]"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                            />
                            <div className="absolute inset-0 pointer-events-none border border-[#D4AF37]/20" />
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            variants={fadeInUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <Card className="p-8 bg-black border-white/5">
                                <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-white mb-2">
                                    Send a Message
                                </h2>
                                <p className="text-gray-500 text-sm mb-8">
                                    Fill out the form below and we&apos;ll get back to you shortly.
                                </p>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="name" className="text-gray-400">Name *</Label>
                                            <Input
                                                id="name"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="bg-[#0A0A0A] border-white/10 focus:border-[#D4AF37]"
                                                placeholder="John Smith"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="text-gray-400">Email *</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="bg-[#0A0A0A] border-white/10 focus:border-[#D4AF37]"
                                                placeholder="john@example.com"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="phone" className="text-gray-400">Phone</Label>
                                            <Input
                                                id="phone"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="bg-[#0A0A0A] border-white/10 focus:border-[#D4AF37]"
                                                placeholder="+61 400 000 000"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="subject" className="text-gray-400">Subject *</Label>
                                            <Input
                                                id="subject"
                                                value={formData.subject}
                                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                                className="bg-[#0A0A0A] border-white/10 focus:border-[#D4AF37]"
                                                placeholder="General Inquiry"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="message" className="text-gray-400">Message *</Label>
                                        <textarea
                                            id="message"
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="w-full min-h-[150px] p-3 bg-[#0A0A0A] border border-white/10 focus:border-[#D4AF37] text-white placeholder:text-gray-600 outline-none resize-none"
                                            placeholder="Your message..."
                                            required
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-[#D4AF37] text-black hover:bg-[#E8C547] text-xs tracking-[0.15em] uppercase py-6"
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
                                </form>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

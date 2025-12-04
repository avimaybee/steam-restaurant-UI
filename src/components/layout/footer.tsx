"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
    navigation: [
        { href: "/menu", label: "Menu" },
        { href: "/reservations", label: "Reservations" },
        { href: "/gallery", label: "Gallery" },
        { href: "/about", label: "About Us" },
    ],
    quickLinks: [
        { href: "/gift-cards", label: "Gift Cards" },
        { href: "/contact", label: "Contact" },
        { href: "/cart", label: "Order Online" },
        { href: "/login", label: "My Account" },
    ],
};

export function Footer() {
    return (
        <footer className="bg-[#0A0A0A] border-t border-white/5">
            <div className="container mx-auto px-6 lg:px-12 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <Link href="/" className="flex items-center gap-2 mb-6">
                            <svg className="w-7 h-7 text-[#D4AF37]" viewBox="0 0 48 48" fill="none">
                                <path
                                    d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z"
                                    fill="currentColor"
                                />
                            </svg>
                            <span className="font-[family-name:var(--font-playfair)] text-xl font-bold tracking-[0.15em] uppercase text-white">
                                Steam
                            </span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Experience the art of modern Asian fusion cuisine in an elegant and sophisticated setting.
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-4 mt-6">
                            {[Instagram, Facebook, Twitter].map((Icon, index) => (
                                <motion.a
                                    key={index}
                                    href="#"
                                    whileHover={{ y: -3 }}
                                    className="w-10 h-10 flex items-center justify-center border border-white/10 text-gray-400 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors"
                                >
                                    <Icon className="w-4 h-4" />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Navigation */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#D4AF37] mb-6">
                            Navigation
                        </h3>
                        <nav className="flex flex-col gap-3">
                            {footerLinks.navigation.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-gray-400 hover:text-white transition-colors text-sm"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#D4AF37] mb-6">
                            Quick Links
                        </h3>
                        <nav className="flex flex-col gap-3">
                            {footerLinks.quickLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-gray-400 hover:text-white transition-colors text-sm"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </motion.div>

                    {/* Contact */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#D4AF37] mb-6">
                            Contact
                        </h3>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                                <span className="text-gray-400 text-sm">123 Culinary Avenue, Melbourne VIC 3000</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                                <span className="text-gray-400 text-sm">+61 (3) 9123 4567</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                                <span className="text-gray-400 text-sm">hello@steam.restaurant</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <Separator className="my-10 bg-white/5" />

                {/* Bottom */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-xs">
                        © 2025 Steam Restaurant. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

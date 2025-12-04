"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, ShoppingBag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

const navLinks = [
    { href: "/menu", label: "Menu" },
    { href: "/reservations", label: "Reservations" },
    { href: "/gallery", label: "Gallery" },
    { href: "/about", label: "About" },
    { href: "/gift-cards", label: "Gift Cards" },
    { href: "/contact", label: "Contact" },
];

export function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? "bg-[#050505]/95 backdrop-blur-xl border-b border-white/5 py-3"
                    : "bg-transparent py-5"
                }`}
        >
            <div className="container mx-auto px-6 lg:px-12">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <motion.svg
                            whileHover={{ rotate: 180 }}
                            transition={{ duration: 0.6 }}
                            className="w-9 h-9 text-[#D4AF37]"
                            viewBox="0 0 48 48"
                            fill="none"
                        >
                            <path
                                d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z"
                                fill="currentColor"
                            />
                        </motion.svg>
                        <span className="font-[family-name:var(--font-playfair)] text-2xl font-bold tracking-[0.15em] uppercase text-white group-hover:text-[#D4AF37] transition-colors">
                            Steam
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link, index) => (
                            <motion.div
                                key={link.href}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 + 0.2 }}
                            >
                                <Link
                                    href={link.href}
                                    className="relative text-xs font-medium tracking-[0.1em] uppercase text-gray-300 hover:text-white transition-colors py-2 group"
                                >
                                    {link.label}
                                    <span className="absolute bottom-0 left-0 w-0 h-px bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
                                </Link>
                            </motion.div>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        <Link
                            href="/cart"
                            className="relative p-2 text-gray-300 hover:text-white transition-colors"
                        >
                            <ShoppingBag className="w-5 h-5" />
                            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-[#D4AF37] text-black text-[10px] font-bold">
                                0
                            </Badge>
                        </Link>

                        <Link href="/login" className="hidden lg:block">
                            <Button
                                variant="outline"
                                size="sm"
                                className="text-xs tracking-[0.1em] uppercase border-gray-600 hover:border-[#D4AF37] hover:text-[#D4AF37] bg-transparent"
                            >
                                Sign In
                            </Button>
                        </Link>

                        {/* Mobile Menu */}
                        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                            <SheetTrigger asChild className="lg:hidden">
                                <Button variant="ghost" size="icon" className="text-white">
                                    <Menu className="w-6 h-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side="right"
                                className="w-full sm:w-[400px] bg-[#050505] border-white/5 p-0"
                            >
                                <div className="flex flex-col items-center justify-center h-full gap-8 p-8">
                                    {navLinks.map((link, index) => (
                                        <motion.div
                                            key={link.href}
                                            initial={{ opacity: 0, x: 50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <Link
                                                href={link.href}
                                                onClick={() => setMobileOpen(false)}
                                                className="font-[family-name:var(--font-playfair)] text-2xl tracking-[0.2em] uppercase text-gray-300 hover:text-[#D4AF37] transition-colors"
                                            >
                                                {link.label}
                                            </Link>
                                        </motion.div>
                                    ))}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 }}
                                    >
                                        <Link href="/login" onClick={() => setMobileOpen(false)}>
                                            <Button className="bg-[#D4AF37] text-black hover:bg-[#E8C547] text-xs tracking-[0.15em] uppercase px-8">
                                                Sign In
                                            </Button>
                                        </Link>
                                    </motion.div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </motion.header>
    );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, ShoppingBag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/cart-context";

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
    const pathname = usePathname();
    const { cart } = useCart();

    const itemCount = cart?.items.reduce((acc, item) => acc + item.quantity, 0) || 0;

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
                        {navLinks.map((link, index) => {
                            const isActive = pathname === link.href;
                            return (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 + 0.2 }}
                                >
                                    <Link
                                        href={link.href}
                                        className={`relative text-xs font-medium tracking-[0.1em] uppercase transition-colors py-2 group ${
                                            isActive ? "text-white" : "text-gray-300 hover:text-white"
                                        }`}
                                    >
                                        {link.label}
                                        <span 
                                            className={`absolute bottom-0 left-0 h-px bg-[#D4AF37] transition-all duration-300 ${
                                                isActive ? "w-full" : "w-0 group-hover:w-full"
                                            }`} 
                                        />
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        <Link
                            href="/cart"
                            className="relative p-2 text-gray-300 hover:text-white transition-colors"
                        >
                            <ShoppingBag className="w-5 h-5" />
                            {itemCount > 0 && (
                                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-[#D4AF37] text-black text-[10px] font-bold">
                                    {itemCount}
                                </Badge>
                            )}
                        </Link>

                        {/* Mobile Menu */}
                        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                            <SheetTrigger asChild className="lg:hidden">
                                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                                    <Menu className="w-6 h-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side="right"
                                className="w-full sm:w-[400px] bg-[#050505] border-l border-white/10 p-0 overflow-hidden"
                            >
                                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                                {/* Background Pattern */}
                                <div className="absolute inset-0 opacity-5 pointer-events-none">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#D4AF37_1px,_transparent_1px)] bg-[size:24px_24px]" />
                                </div>
                                
                                <div className="flex flex-col h-full relative z-10">
                                    <div className="flex items-center justify-between p-6 border-b border-white/5">
                                        <span className="font-[family-name:var(--font-playfair)] text-xl font-bold tracking-[0.15em] uppercase text-white">
                                            Menu
                                        </span>
                                        <SheetClose asChild>
                                            <Button variant="ghost" size="icon" className="text-white hover:text-[#D4AF37]">
                                                <X className="w-6 h-6" />
                                            </Button>
                                        </SheetClose>
                                    </div>

                                    <div className="flex flex-col items-center justify-center flex-1 gap-8 p-8">
                                        {navLinks.map((link, index) => {
                                            const isActive = pathname === link.href;
                                            return (
                                                <motion.div
                                                    key={link.href}
                                                    initial={{ opacity: 0, x: 50 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.1 }}
                                                >
                                                    <Link
                                                        href={link.href}
                                                        onClick={() => setMobileOpen(false)}
                                                        className={`font-[family-name:var(--font-playfair)] text-3xl tracking-[0.1em] uppercase transition-colors ${
                                                            isActive ? "text-[#D4AF37]" : "text-gray-300 hover:text-[#D4AF37]"
                                                        }`}
                                                    >
                                                        {link.label}
                                                    </Link>
                                                </motion.div>
                                            );
                                        })}
                                    </div>

                                    <div className="p-8 border-t border-white/5 text-center">
                                        <p className="text-xs text-gray-500 tracking-widest uppercase mb-2">Reservations</p>
                                        <p className="text-[#D4AF37] font-[family-name:var(--font-playfair)] text-lg">+61 (3) 9123 4567</p>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </motion.header>
    );
}

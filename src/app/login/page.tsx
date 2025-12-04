"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, ChefHat, Wine, Award, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const perks = [
    { icon: ChefHat, title: "Priority Reservations", desc: "Skip the waitlist" },
    { icon: Wine, title: "Exclusive Events", desc: "Members-only tastings" },
    { icon: Award, title: "Loyalty Rewards", desc: "Earn points on every visit" },
    { icon: Sparkles, title: "Special Offers", desc: "Birthday treats & more" },
];

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate login
        await new Promise((resolve) => setTimeout(resolve, 1500));

        toast.success("Welcome back!", {
            description: "You've been successfully signed in.",
        });
        setIsLoading(false);
    };

    return (
        <main className="min-h-screen bg-black flex">
            {/* Left Side - Form */}
            <div className="flex-1 flex items-center justify-center p-8 lg:p-16">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full max-w-md"
                >
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 mb-12">
                        <svg className="w-8 h-8 text-[#D4AF37]" viewBox="0 0 48 48" fill="none">
                            <path
                                d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z"
                                fill="currentColor"
                            />
                        </svg>
                        <span className="font-[family-name:var(--font-playfair)] text-xl font-bold tracking-[0.15em] uppercase text-white">
                            Steam
                        </span>
                    </Link>

                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-white mb-2">
                            Welcome Back
                        </h1>
                        <p className="text-gray-400">
                            Sign in to access your account and reservations
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-400">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10 bg-[#0A0A0A] border-white/10 focus:border-[#D4AF37] h-12"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <Label htmlFor="password" className="text-gray-400">Password</Label>
                                <Link href="/forgot-password" className="text-xs text-[#D4AF37] hover:text-[#E8C547]">
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10 pr-10 bg-[#0A0A0A] border-white/10 focus:border-[#D4AF37] h-12"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#D4AF37] text-black hover:bg-[#E8C547] h-12 text-xs tracking-[0.15em] uppercase shimmer"
                        >
                            {isLoading ? (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                    className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                                />
                            ) : (
                                "Sign In"
                            )}
                        </Button>
                    </form>

                    <div className="flex items-center gap-4 my-8">
                        <Separator className="flex-1 bg-white/10" />
                        <span className="text-xs text-gray-500 uppercase tracking-wider">or continue with</span>
                        <Separator className="flex-1 bg-white/10" />
                    </div>

                    {/* Social Login */}
                    <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="h-12 border-white/10 hover:border-white/30 bg-transparent">
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            Google
                        </Button>
                        <Button variant="outline" className="h-12 border-white/10 hover:border-white/30 bg-transparent">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
                            </svg>
                            Apple
                        </Button>
                    </div>

                    <p className="text-center text-gray-500 text-sm mt-8">
                        Don&apos;t have an account?{" "}
                        <Link href="/register" className="text-[#D4AF37] hover:text-[#E8C547]">
                            Create one
                        </Link>
                    </p>
                </motion.div>
            </div>

            {/* Right Side - Image & Perks */}
            <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="hidden lg:flex flex-1 relative bg-[#0A0A0A] border-l border-white/5"
            >
                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1920"
                        alt="Restaurant interior"
                        fill
                        className="object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
                </div>

                {/* Perks */}
                <div className="relative z-10 flex flex-col justify-center p-16">
                    <span className="text-xs tracking-[0.3em] uppercase text-[#D4AF37] mb-4">
                        Member Benefits
                    </span>
                    <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-white mb-8">
                        Join the Steam Experience
                    </h2>

                    <div className="space-y-6">
                        {perks.map((perk, index) => (
                            <motion.div
                                key={perk.title}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + index * 0.1 }}
                                className="flex items-start gap-4"
                            >
                                <div className="w-12 h-12 flex items-center justify-center bg-[#D4AF37]/10 text-[#D4AF37]">
                                    <perk.icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">{perk.title}</h3>
                                    <p className="text-gray-500 text-sm">{perk.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </main>
    );
}

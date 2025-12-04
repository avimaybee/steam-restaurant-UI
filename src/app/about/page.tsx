"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Award, Users, Calendar, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const stats = [
    { icon: Calendar, value: "2018", label: "Established" },
    { icon: Award, value: "15+", label: "Awards Won" },
    { icon: Users, value: "50K+", label: "Happy Guests" },
    { icon: Star, value: "4.9", label: "Average Rating" },
];

const team = [
    {
        name: "Chef Marcus Chen",
        role: "Executive Chef",
        image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=400",
        bio: "20+ years mastering Asian fusion cuisine across Tokyo, Singapore, and Melbourne.",
    },
    {
        name: "Sophia Williams",
        role: "Head Sommelier",
        image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=400",
        bio: "Certified sommelier with expertise in pairing wines with Asian flavors.",
    },
    {
        name: "David Park",
        role: "Pastry Chef",
        image: "https://images.unsplash.com/photo-1583394293214-28ez5d9bf3ae?q=80&w=400",
        bio: "Creating East-meets-West desserts that delight and surprise.",
    },
];

const awards = [
    { year: "2024", title: "Best Asian Fusion", org: "Melbourne Food Awards" },
    { year: "2023", title: "Chef of the Year", org: "Culinary Excellence" },
    { year: "2023", title: "Wine Program Award", org: "Sommelier Awards" },
    { year: "2022", title: "Restaurant of the Year", org: "Good Food Guide" },
];

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 },
    },
};

export default function AboutPage() {
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });
    const y = useTransform(scrollYProgress, [0, 1], [0, 150]);

    return (
        <main className="min-h-screen bg-black">
            <Header />

            {/* Hero */}
            <section ref={heroRef} className="relative h-[70vh] flex items-center justify-center overflow-hidden">
                <motion.div style={{ y }} className="absolute inset-0">
                    <Image
                        src="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?q=80&w=1920"
                        alt="Restaurant kitchen"
                        fill
                        className="object-cover"
                        style={{ filter: "brightness(0.3)" }}
                        priority
                    />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 text-center px-6"
                >
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <span className="w-8 h-px bg-[#D4AF37]/50" />
                        <div className="w-2 h-2 bg-[#D4AF37] rotate-45" />
                        <span className="w-8 h-px bg-[#D4AF37]/50" />
                    </div>
                    <h1 className="font-[family-name:var(--font-playfair)] text-5xl lg:text-7xl font-bold text-white mb-4">
                        Our Story
                    </h1>
                    <p className="text-gray-400 text-lg max-w-md mx-auto">
                        A journey of passion, tradition, and culinary innovation
                    </p>
                </motion.div>
            </section>

            {/* Stats */}
            <section className="py-16 bg-[#0A0A0A] border-y border-white/5">
                <div className="container mx-auto px-6 lg:px-12">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                                className="text-center"
                            >
                                <stat.icon className="w-6 h-6 text-[#D4AF37] mx-auto mb-3" />
                                <span className="block font-[family-name:var(--font-playfair)] text-4xl font-bold text-white mb-1">
                                    {stat.value}
                                </span>
                                <span className="text-sm text-gray-500 uppercase tracking-wider">
                                    {stat.label}
                                </span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-24">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="text-xs tracking-[0.3em] uppercase text-[#D4AF37] mb-4 block">
                                The Beginning
                            </span>
                            <h2 className="font-[family-name:var(--font-playfair)] text-3xl lg:text-5xl font-semibold text-white mb-6">
                                From Dream to Reality
                            </h2>
                            <div className="space-y-4 text-gray-400 leading-relaxed">
                                <p>
                                    Steam was born from a vision to create a dining experience that honors the rich
                                    traditions of Asian cuisine while embracing contemporary innovation. Founded in
                                    2018 by Chef Marcus Chen, our restaurant quickly became Melbourne&apos;s destination
                                    for those seeking culinary excellence.
                                </p>
                                <p>
                                    Every dish tells a story—of heritage, of craftsmanship, of the countless hours
                                    spent perfecting techniques passed down through generations. We source the finest
                                    ingredients, work with local farmers and artisans, and pour our hearts into
                                    every plate.
                                </p>
                                <p>
                                    Today, Steam stands as a testament to what happens when passion meets precision.
                                    We invite you to be part of our continuing story.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative"
                        >
                            <div className="relative aspect-[4/5] overflow-hidden">
                                <Image
                                    src="https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=800"
                                    alt="Chef at work"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-6 -left-6 w-48 h-48 border border-[#D4AF37] -z-10" />
                            <div className="absolute -top-6 -right-6 w-48 h-48 border border-[#D4AF37]/30 -z-10" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-24 bg-[#0A0A0A]">
                <div className="container mx-auto px-6 lg:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-xs tracking-[0.3em] uppercase text-[#D4AF37]">
                            The Artisans
                        </span>
                        <h2 className="font-[family-name:var(--font-playfair)] text-3xl lg:text-5xl font-semibold text-white mt-4">
                            Meet Our Team
                        </h2>
                    </motion.div>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-3 gap-8"
                    >
                        {team.map((member, index) => (
                            <motion.div key={index} variants={fadeInUp}>
                                <Card className="bg-black border-white/5 overflow-hidden group">
                                    <div className="relative aspect-[3/4] overflow-hidden">
                                        <Image
                                            src={member.image}
                                            alt={member.name}
                                            fill
                                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                                    </div>
                                    <div className="p-6 relative -mt-20">
                                        <span className="text-xs tracking-[0.2em] uppercase text-[#D4AF37]">
                                            {member.role}
                                        </span>
                                        <h3 className="font-[family-name:var(--font-playfair)] text-xl text-white mt-1 mb-2">
                                            {member.name}
                                        </h3>
                                        <p className="text-gray-500 text-sm">{member.bio}</p>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Awards Section */}
            <section className="py-24">
                <div className="container mx-auto px-6 lg:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-xs tracking-[0.3em] uppercase text-[#D4AF37]">
                            Recognition
                        </span>
                        <h2 className="font-[family-name:var(--font-playfair)] text-3xl lg:text-5xl font-semibold text-white mt-4">
                            Awards & Accolades
                        </h2>
                    </motion.div>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {awards.map((award, index) => (
                            <motion.div key={index} variants={fadeInUp}>
                                <Card className="p-6 bg-[#0A0A0A] border-white/5 hover:border-[#D4AF37]/30 transition-all text-center">
                                    <Award className="w-8 h-8 text-[#D4AF37] mx-auto mb-4" />
                                    <span className="text-sm text-gray-500">{award.year}</span>
                                    <h3 className="font-[family-name:var(--font-playfair)] text-lg text-white mt-1 mb-2">
                                        {award.title}
                                    </h3>
                                    <span className="text-xs text-gray-500 uppercase tracking-wider">
                                        {award.org}
                                    </span>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-[#0A0A0A] border-t border-white/5">
                <div className="container mx-auto px-6 lg:px-12 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="font-[family-name:var(--font-playfair)] text-3xl lg:text-4xl font-semibold text-white mb-6">
                            Experience Steam Today
                        </h2>
                        <p className="text-gray-400 mb-8 max-w-md mx-auto">
                            Join us for an unforgettable culinary journey where every dish tells a story.
                        </p>
                        <Link href="/reservations">
                            <Button className="bg-[#D4AF37] text-black hover:bg-[#E8C547] text-xs tracking-[0.15em] uppercase px-8 py-6">
                                Reserve Your Table
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

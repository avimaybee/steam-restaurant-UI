"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChefHat, Wine, Sparkles, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// Steam particles component
function SteamParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="steam-particle"
          style={{
            left: `${10 + i * 12}%`,
            animationDelay: `${i * 0.8}s`,
            bottom: "20%",
          }}
        />
      ))}
    </div>
  );
}

// Hero Section
function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070"
          alt="Restaurant ambiance"
          fill
          className="object-cover"
          style={{ filter: "brightness(0.4) saturate(1.1)" }}
          priority
        />
      </motion.div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black z-[1]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center_bottom,_rgba(212,175,55,0.08)_0%,_transparent_60%)] z-[1]" />

      {/* Steam Particles */}
      <SteamParticles />

      {/* Floating Badges */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="hidden lg:flex absolute left-12 top-1/2 -translate-y-1/2 -rotate-90 origin-left items-center gap-4 z-10"
      >
        <span className="text-xs tracking-[0.2em] uppercase text-gray-400">Est. 2018</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="hidden lg:flex absolute right-12 top-1/2 -translate-y-1/2 rotate-90 origin-right items-center gap-4 z-10"
      >
        <span className="text-xs tracking-[0.2em] uppercase text-gray-400">Fine Dining</span>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center px-6 max-w-5xl"
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Overline */}
          <motion.div variants={fadeInUp} className="flex items-center justify-center gap-4">
            <span className="w-10 h-px bg-[#D4AF37]" />
            <span className="text-xs tracking-[0.3em] uppercase text-[#D4AF37]">
              Modern Asian Fusion
            </span>
            <span className="w-10 h-px bg-[#D4AF37]" />
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={fadeInUp}
            className="font-[family-name:var(--font-playfair)] text-5xl sm:text-7xl lg:text-9xl font-bold tracking-tight text-white"
          >
            Steam
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="block font-[family-name:var(--font-playfair)] text-lg sm:text-xl lg:text-2xl font-normal italic text-[#D4AF37] tracking-[0.2em] mt-4"
            >
              Where Tradition Meets Innovation
            </motion.span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeInUp}
            className="text-gray-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
          >
            Experience the art of contemporary Asian cuisine in an atmosphere
            of refined elegance. Every dish tells a story of heritage and creativity.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link href="/reservations">
              <Button
                size="lg"
                className="bg-[#D4AF37] text-black hover:bg-[#E8C547] text-xs tracking-[0.15em] uppercase px-8 py-6 shimmer"
              >
                Reserve a Table
              </Button>
            </Link>
            <Link href="/menu">
              <Button
                size="lg"
                variant="outline"
                className="border-gray-500 text-white hover:border-[#D4AF37] hover:text-[#D4AF37] bg-transparent text-xs tracking-[0.15em] uppercase px-8 py-6"
              >
                View Menu
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="absolute -bottom-32 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-gray-400">Scroll</span>
          <motion.div
            animate={{ scaleY: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-px h-16 bg-gradient-to-b from-[#D4AF37] to-transparent"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

// Philosophy Section
function PhilosophySection() {
  return (
    <section className="py-32 bg-black relative">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/5] overflow-hidden group"
          >
            <Image
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974"
              alt="Chef preparing dish"
              fill
              className="object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-4 border border-[#D4AF37] pointer-events-none" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:pl-12"
          >
            <span className="font-[family-name:var(--font-playfair)] text-7xl font-bold text-white/5">
              01
            </span>
            <span className="block text-xs tracking-[0.3em] uppercase text-[#D4AF37] mt-2 mb-4">
              Our Philosophy
            </span>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl lg:text-5xl font-semibold text-white mb-6">
              Crafted with Passion
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              At Steam, we believe that exceptional dining is an art form.
              Our kitchen blends time-honored Asian techniques with contemporary
              innovation, creating dishes that honor tradition while pushing
              culinary boundaries.
            </p>
            <p className="text-gray-400 mb-8">
              Every ingredient is sourced with intention. Every plate is composed
              with precision. Every moment is designed to transport you.
            </p>
            <Link href="/about">
              <Button
                variant="ghost"
                className="text-[#D4AF37] hover:text-[#E8C547] p-0 text-sm tracking-[0.1em] uppercase group"
              >
                Discover Our Story
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Features Section
const features = [
  {
    icon: ChefHat,
    title: "Exquisite Cuisine",
    description: "Award-winning dishes crafted by our internationally trained culinary team.",
  },
  {
    icon: Wine,
    title: "Curated Pairings",
    description: "An extensive collection of sake, wines, and signature cocktails.",
  },
  {
    icon: Sparkles,
    title: "Refined Ambiance",
    description: "Intimate spaces designed for meaningful connections.",
  },
  {
    icon: Award,
    title: "Private Events",
    description: "Bespoke dining experiences for celebrations and gatherings.",
  },
];

function FeaturesSection() {
  return (
    <section className="py-32 bg-[#0A0A0A] relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />

      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-[#D4AF37]">The Experience</span>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl lg:text-5xl font-semibold text-white mt-4">
            Why Choose Steam
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card className="p-8 bg-black border-white/5 hover:border-[#D4AF37]/20 transition-all duration-500 group h-full">
                <feature.icon className="w-8 h-8 text-[#D4AF37] mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="font-[family-name:var(--font-playfair)] text-xl text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
                <div className="absolute top-0 left-0 w-0 h-px bg-[#D4AF37] group-hover:w-16 transition-all duration-500" />
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  return (
    <section className="py-32 bg-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#D4AF37_1px,_transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="w-20 h-px bg-gradient-to-r from-transparent to-[#D4AF37]/50" />
            <div className="w-2 h-2 bg-[#D4AF37] rotate-45" />
            <span className="w-20 h-px bg-gradient-to-l from-transparent to-[#D4AF37]/50" />
          </div>

          <h2 className="font-[family-name:var(--font-playfair)] text-3xl lg:text-5xl font-semibold text-white mb-6">
            Reserve Your Experience
          </h2>
          <p className="text-gray-300 text-lg mb-10">
            Join us for an unforgettable culinary journey. Our team awaits to craft your perfect evening.
          </p>
          <Link href="/reservations">
            <Button
              size="lg"
              className="bg-[#D4AF37] text-black hover:bg-[#E8C547] text-xs tracking-[0.15em] uppercase px-10 py-6 shimmer"
            >
              Book a Table
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// Main Page Component
export default function HomePage() {
  return (
    <main className="min-h-screen bg-black">
      <Header />
      <HeroSection />
      <PhilosophySection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </main>
  );
}

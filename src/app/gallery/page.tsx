"use client";

import { Assets } from "@/lib/assets";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const categories = ["All", "Interior", "Dishes", "Events", "Team"];

const galleryImages = [
    { src: Assets.interior.welcomeToSteam, category: "Interior", title: "Welcome to Steam" },
    { src: Assets.interior.decor, category: "Interior", title: "Dining Room" },
    { src: Assets.interior.decor1, category: "Interior", title: "Atmosphere" },
    { src: Assets.interior.placeAtOpening, category: "Events", title: "Opening Night" },
    { src: Assets.interior.large1, category: "Events", title: "Celebration" },
    { src: Assets.interior.large2, category: "Interior", title: "Restaurant View" },
    { src: Assets.food.sashimi, category: "Dishes", title: "Sashimi Tasting Board" },
    { src: Assets.food.oysters4Ways, category: "Dishes", title: "Oysters 4 Ways" },
    { src: Assets.food.oystersFresh, category: "Dishes", title: "Fresh Oysters" },
    { src: Assets.food.scallops, category: "Dishes", title: "Charred Scallops" },
    { src: Assets.food.softShellCrab, category: "Dishes", title: "Soft Shell Crab" },
    { src: Assets.food.barramundi, category: "Dishes", title: "Crispy Skin Barramundi" },
    { src: Assets.food.beefEyeFillet, category: "Dishes", title: "Sizzling Eye Fillet" },
    { src: Assets.food.beefTartare, category: "Dishes", title: "Beef Tartare" },
    { src: Assets.food.betalLeafPork, category: "Dishes", title: "Sticky Pork Betel Leaf" },
    { src: Assets.food.porkBetalLeaf, category: "Dishes", title: "Pork Betel Leaf" },
    { src: Assets.food.gyoza, category: "Dishes", title: "Japanese Gyoza" },
    { src: Assets.food.sweetCorn, category: "Dishes", title: "Sweet Corn & Coriander" },
    { src: Assets.drinks.sake, category: "Dishes", title: "Sake Selection" },
    { src: Assets.food.generic1, category: "Dishes", title: "Noodle Dish" },
    { src: Assets.food.generic2, category: "Dishes", title: "Spicy Chicken" },
    { src: Assets.food.generic3, category: "Dishes", title: "Spring Rolls" },
];

export default function GalleryPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const filteredImages = activeCategory === "All"
        ? galleryImages
        : galleryImages.filter((img) => img.category === activeCategory);

    const openLightbox = (index: number) => {
        setCurrentIndex(index);
        setLightboxOpen(true);
    };

    const navigateLightbox = (direction: "prev" | "next") => {
        if (direction === "prev") {
            setCurrentIndex((prev) => (prev === 0 ? filteredImages.length - 1 : prev - 1));
        } else {
            setCurrentIndex((prev) => (prev === filteredImages.length - 1 ? 0 : prev + 1));
        }
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
                        Gallery
                    </h1>
                    <p className="text-gray-400 text-lg max-w-md mx-auto">
                        A visual journey through the Steam experience
                    </p>
                </motion.div>
            </section>

            {/* Category Filter */}
            <section className="sticky top-[72px] z-40 bg-[#050505]/95 backdrop-blur-xl border-y border-white/5">
                <div className="container mx-auto px-6 lg:px-12 py-4">
                    <div className="flex justify-center gap-2 flex-wrap">
                        {categories.map((cat) => (
                            <Button
                                key={cat}
                                variant={activeCategory === cat ? "default" : "outline"}
                                onClick={() => setActiveCategory(cat)}
                                className={`text-xs tracking-[0.1em] uppercase ${activeCategory === cat
                                        ? "bg-[#D4AF37] text-black hover:bg-[#E8C547]"
                                        : "border-white/10 text-gray-400 hover:text-white hover:border-white/30 bg-transparent"
                                    }`}
                            >
                                {cat}
                            </Button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="py-12">
                <div className="container mx-auto px-6 lg:px-12">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                        >
                            {filteredImages.map((image, index) => (
                                <motion.div
                                    key={`${image.title}-${index}`}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                    className={`relative overflow-hidden cursor-pointer group ${index % 5 === 0 ? "md:col-span-2 md:row-span-2" : ""
                                        }`}
                                    onClick={() => openLightbox(index)}
                                >
                                    <div className="relative aspect-square">
                                        <Image
                                            src={image.src}
                                            alt={image.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300" />
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="text-center">
                                                <span className="text-xs tracking-[0.2em] uppercase text-[#D4AF37] block mb-1">
                                                    {image.category}
                                                </span>
                                                <h3 className="font-[family-name:var(--font-playfair)] text-lg text-white">
                                                    {image.title}
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>

            {/* Lightbox */}
            <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
                <DialogContent className="max-w-5xl bg-black/95 border-white/10 p-0">
                    <div className="relative aspect-video">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="relative w-full h-full"
                            >
                                <Image
                                    src={filteredImages[currentIndex]?.src || ""}
                                    alt={filteredImages[currentIndex]?.title || ""}
                                    fill
                                    className="object-contain"
                                />
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => navigateLightbox("prev")}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10"
                        >
                            <ChevronLeft className="w-8 h-8" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => navigateLightbox("next")}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10"
                        >
                            <ChevronRight className="w-8 h-8" />
                        </Button>

                        {/* Caption */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
                            <span className="text-xs tracking-[0.2em] uppercase text-[#D4AF37] block">
                                {filteredImages[currentIndex]?.category}
                            </span>
                            <h3 className="font-[family-name:var(--font-playfair)] text-xl text-white">
                                {filteredImages[currentIndex]?.title}
                            </h3>
                            <span className="text-sm text-gray-500">
                                {currentIndex + 1} / {filteredImages.length}
                            </span>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            <Footer />
        </main>
    );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const categories = ["All", "Interior", "Dishes", "Events", "Team"];

const galleryImages = [
    { src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800", category: "Interior", title: "Main Dining Room" },
    { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800", category: "Interior", title: "Private Dining" },
    { src: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800", category: "Dishes", title: "Sashimi Selection" },
    { src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800", category: "Dishes", title: "Chef's Special" },
    { src: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800", category: "Dishes", title: "Wagyu Beef" },
    { src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800", category: "Interior", title: "Bar Area" },
    { src: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=800", category: "Team", title: "Executive Chef" },
    { src: "https://images.unsplash.com/photo-1560717789-0ac7c58ac90a?q=80&w=800", category: "Events", title: "Wine Tasting" },
    { src: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=800", category: "Dishes", title: "Pad Thai" },
    { src: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?q=80&w=800", category: "Interior", title: "Kitchen" },
    { src: "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=800", category: "Team", title: "Plating Excellence" },
    { src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800", category: "Dishes", title: "Signature Dish" },
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
                                    key={image.src}
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

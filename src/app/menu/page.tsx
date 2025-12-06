"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { toast } from "sonner";
import { useCart } from "@/context/cart-context";

// Menu data
const menuCategories = [
    { id: "all", label: "All" },
    { id: "raw-bar", label: "Raw Bar" },
    { id: "small-plates", label: "Small Plates" },
    { id: "mains", label: "Main Plates" },
    { id: "sushi", label: "Sushi" },
    { id: "desserts", label: "Desserts" },
    { id: "beverages", label: "Beverages" },
];

const menuItems = [
    // Raw Bar
    {
        id: 1,
        name: "Natural Oysters",
        description: "Freshly shucked, served with lemon & condiments",
        price: 16,
        image: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?q=80&w=400",
        category: "raw-bar",
        tags: ["GF"],
    },
    {
        id: 2,
        name: "Sashimi Platter",
        description: "Tuna, salmon, kingfish with traditional condiments",
        price: 40,
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=400",
        category: "raw-bar",
        tags: ["GF"],
    },
    {
        id: 3,
        name: "Seafood Tower",
        description: "Sashimi platter, prawns, calamari, dressed scallop",
        price: 80,
        image: "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=400",
        category: "raw-bar",
        tags: ["For Two"],
    },
    // Small Plates
    {
        id: 4,
        name: "Duck Pancakes",
        description: "Braised duck, iceberg, Asian herbs, chilli-plum glaze",
        price: 25,
        image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?q=80&w=400",
        category: "small-plates",
        tags: [],
    },
    {
        id: 5,
        name: "Spicy Wagyu Dumplings",
        description: "Chilli-soy ponzu, sesame, micro herbs",
        price: 25,
        image: "https://images.unsplash.com/photo-1563245372-f21724557954?q=80&w=400",
        category: "small-plates",
        tags: [],
    },
    {
        id: 6,
        name: "Bao Buns",
        description: "Choice of pork belly, chicken, or tofu. 2 per serve",
        price: 22,
        image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=400",
        category: "small-plates",
        tags: ["VEG"],
    },
    {
        id: 7,
        name: "Karaage Chicken",
        description: "Pickled vegetables, daikon, house mayo",
        price: 20,
        image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?q=80&w=400",
        category: "small-plates",
        tags: [],
    },
    // Main Plates
    {
        id: 8,
        name: "Korean Beef Bulgogi",
        description: "Soy-garlic glazed tender beef, stir-fried vegetables, sesame",
        price: 40,
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=400",
        category: "mains",
        tags: [],
    },
    {
        id: 9,
        name: "Red Duck Curry",
        description: "Lychee, tomato, coconut chilli broth, steamed rice",
        price: 34,
        image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?q=80&w=400",
        category: "mains",
        tags: [],
    },
    {
        id: 10,
        name: "Pad Thai",
        description: "Choice of prawn or tofu with rice noodles",
        price: 32,
        image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=400",
        category: "mains",
        tags: ["GF", "VEG"],
    },
    {
        id: 11,
        name: "Barramundi Fillet",
        description: "Soy-ginger dashi, shiitake, steamed greens, jasmine rice",
        price: 45,
        image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?q=80&w=400",
        category: "mains",
        tags: ["GF"],
    },
    // Sushi
    {
        id: 12,
        name: "Salmon Nigiri",
        description: "Fresh sushi-grade salmon over hand-pressed seasoned rice",
        price: 20,
        image: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?q=80&w=400",
        category: "sushi",
        tags: [],
    },
    {
        id: 13,
        name: "California Roll",
        description: "Avocado, salmon, cucumber, and Philadelphia cream cheese",
        price: 20,
        image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=400",
        category: "sushi",
        tags: [],
    },
    // Desserts
    {
        id: 14,
        name: "Mochi with Seasonal Fruit",
        description: "Served with fresh cream",
        price: 10,
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=400",
        category: "desserts",
        tags: ["V", "GF"],
    },
    {
        id: 15,
        name: "Affogato",
        description: "Vanilla ice cream, espresso pearls, hot espresso",
        price: 15,
        image: "https://images.unsplash.com/photo-1594488506255-ee7bca8f1a39?q=80&w=400",
        category: "desserts",
        tags: [],
    },
    // Beverages
    {
        id: 16,
        name: "Ginger & Lychee Martini",
        description: "Vodka, lychee liqueur, fresh lime, ginger syrup",
        price: 21,
        image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=400",
        category: "beverages",
        tags: [],
    },
    {
        id: 17,
        name: "Premium Teas",
        description: "Jasmine Pearls, Sencha Green, English Breakfast",
        price: 6,
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=400",
        category: "beverages",
        tags: [],
    },
];

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
};

export default function MenuPage() {
    const [activeCategory, setActiveCategory] = useState("all");
    const { addToCart } = useCart();

    const filteredItems = activeCategory === "all"
        ? menuItems
        : menuItems.filter((item) => item.category === activeCategory);

    return (
        <main className="min-h-screen bg-[#0A0A0A]">
            <Header />

            {/* Hero */}
            <section className="relative pt-28 pb-12 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-[#0A0A0A]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,_rgba(212,175,55,0.1)_0%,_transparent_70%)] blur-3xl" />

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
                        Our Menu
                    </h1>
                    <p className="text-gray-400 text-lg max-w-md mx-auto">
                        A symphony of flavors where tradition meets innovation
                    </p>
                </motion.div>
            </section>

            {/* Category Tabs */}
            <section className="sticky top-[72px] z-40 bg-[#050505]/95 backdrop-blur-xl border-y border-white/5">
                <div className="container mx-auto px-6 lg:px-12 py-2 overflow-x-auto no-scrollbar">
                    <Tabs value={activeCategory} onValueChange={setActiveCategory}>
                        <TabsList className="bg-transparent h-auto p-0 gap-2 flex-nowrap">
                            {menuCategories.map((cat) => (
                                <TabsTrigger
                                    key={cat.id}
                                    value={cat.id}
                                    className="px-3 py-1.5 text-[10px] sm:text-xs tracking-[0.1em] uppercase whitespace-nowrap data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black data-[state=inactive]:text-gray-400 data-[state=inactive]:hover:text-white border border-white/10 data-[state=active]:border-[#D4AF37] transition-all"
                                >
                                    {cat.label}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>
                </div>
            </section>

            {/* Menu Grid */}
            <section className="py-16">
                <div className="container mx-auto px-6 lg:px-12">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {filteredItems.map((item) => (
                                <motion.div key={item.id} variants={itemVariants} layout>
                                    <Card className="bg-black border-white/5 hover:border-[#D4AF37]/30 transition-all duration-500 overflow-hidden group">
                                        <div className="flex gap-4 p-4">
                                            {/* Image */}
                                            <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden">
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-[family-name:var(--font-playfair)] text-lg text-white mb-1 truncate">
                                                    {item.name}
                                                </h3>
                                                <p className="text-gray-500 text-sm line-clamp-2 mb-2">
                                                    {item.description}
                                                </p>
                                                {item.tags.length > 0 && (
                                                    <div className="flex gap-1 flex-wrap">
                                                        {item.tags.map((tag) => (
                                                            <Badge
                                                                key={tag}
                                                                variant="secondary"
                                                                className="text-[10px] bg-[#D4AF37]/10 text-[#D4AF37] border-none px-1.5 py-0"
                                                            >
                                                                {tag}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Price & Add */}
                                            <div className="flex flex-col items-end justify-between">
                                                <span className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-[#D4AF37]">
                                                    ${item.price}
                                                </span>
                                                <Button
                                                    size="icon"
                                                    variant="outline"
                                                    onClick={() => addToCart({
                                                        id: item.id.toString(),
                                                        name: item.name,
                                                        price: item.price,
                                                        image: item.image
                                                    })}
                                                    className="w-9 h-9 border-white/10 hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>

            {/* Allergen Info */}
            <section className="py-12 bg-black border-t border-white/5">
                <div className="container mx-auto px-6 lg:px-12 text-center">
                    <h3 className="text-sm font-semibold text-white mb-4">Allergen Information</h3>
                    <div className="flex justify-center flex-wrap gap-6 mb-4">
                        <span className="text-sm text-gray-400"><span className="text-[#D4AF37] font-semibold">GF</span> Gluten-Free</span>
                        <span className="text-sm text-gray-400"><span className="text-[#D4AF37] font-semibold">DF</span> Dairy-Free</span>
                        <span className="text-sm text-gray-400"><span className="text-[#D4AF37] font-semibold">V</span> Vegan</span>
                        <span className="text-sm text-gray-400"><span className="text-[#D4AF37] font-semibold">VEG</span> Vegetarian</span>
                    </div>
                    <p className="text-xs text-gray-500 max-w-xl mx-auto">
                        Please inform your server of any allergies or dietary restrictions. While we take precautions, we cannot guarantee a completely allergen-free environment.
                    </p>
                </div>
            </section>

            <Footer />
        </main>
    );
}

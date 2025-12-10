"use client";

import { Assets } from "@/lib/assets";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useCart } from "@/context/cart-context";

// Menu data - Real Steam Restaurant menu items
const menuCategories = [
    { id: "all", label: "All" },
    { id: "appetizers", label: "Appetizers" },
    { id: "mains", label: "Mains" },
    { id: "noodles-rice", label: "Noodles & Rice" },
    { id: "drinks", label: "Drinks" },
];

const menuItems = [
    // Appetizers / Starters
    {
        id: 1,
        name: "Spring Rolls",
        description: "Crispy vegetable spring rolls with sweet chilli dipping sauce",
        price: 14,
        image: Assets.food.generic3,
        category: "appetizers",
        tags: ["V", "VEG"],
    },
    {
        id: 2,
        name: "Salt & Pepper Squid",
        description: "Tender squid, lightly seasoned, served with aioli",
        price: 18,
        image: Assets.food.generic4,
        category: "appetizers",
        tags: ["GF"],
    },
    {
        id: 3,
        name: "Satay Skewers",
        description: "Grilled chicken skewers with house-made peanut sauce",
        price: 16,
        image: Assets.food.generic5,
        category: "appetizers",
        tags: ["GF", "DF"],
    },
    {
        id: 4,
        name: "Prawn Dumplings",
        description: "Steamed prawn dumplings with soy-ginger dipping sauce",
        price: 18,
        image: Assets.food.gyoza,
        category: "appetizers",
        tags: [],
    },
    // Mains
    {
        id: 5,
        name: "Thai Vegan Curry",
        description: "Tofu, carrot, beans, spinach, coriander, coconut, chilli, served with jasmine rice",
        price: 35,
        image: Assets.food.sweetCorn,
        category: "mains",
        tags: ["V", "GF", "DF"],
    },
    {
        id: 6,
        name: "Khmer Seafood Curry",
        description: "Fish, prawn, beans, spinach, coconut, lime, cherry tomato, coriander, chilli with jasmine rice",
        price: 50,
        image: Assets.food.scallops,
        category: "mains",
        tags: ["GF"],
    },
    {
        id: 7,
        name: "Barramundi",
        description: "Soy sauce, ginger, dashi, shiitake mushroom, broccolini, spinach, furikake, jasmine rice",
        price: 46,
        image: Assets.food.barramundi,
        category: "mains",
        tags: ["GF"],
    },
    {
        id: 8,
        name: "Durry Duck",
        description: "Baby corn, lychee, carrot, cherry tomato, coriander, chilli, spinach, served with jasmine rice",
        price: 45,
        image: Assets.food.porkBetalLeaf,
        category: "mains",
        tags: [],
    },
    {
        id: 9,
        name: "Sizzling Beef Eye Fillet",
        description: "Spring onion, chilli, peanut oil, mushroom soy, sesame oil, Asian greens stir fry",
        price: 55,
        image: Assets.food.beefEyeFillet,
        category: "mains",
        tags: ["GF"],
    },
    {
        id: 10,
        name: "Korean Beef Bulgogi",
        description: "Finely sliced beef, onion, zucchini, carrot, garlic, ginger, soy sauce, sesame, rocket, jasmine rice",
        price: 45,
        image: Assets.food.beefTartare,
        category: "mains",
        tags: [],
    },
    {
        id: 11,
        name: "Braised Pork Belly",
        description: "Soy sauce, dark sauce, garlic, ginger, shiitake mushroom, sesame, bok choy, chilli, spring onion",
        price: 45,
        image: Assets.food.betalLeafPork,
        category: "mains",
        tags: [],
    },
    {
        id: 12,
        name: "Chicken Sambal",
        description: "Spicy chicken with chilli, shallot, ginger, garlic, cherry tomato, mozzarella cheese, jasmine rice",
        price: 38,
        image: Assets.food.generic2,
        category: "mains",
        tags: ["GF", "Spicy"],
    },
    // Noodles & Rice
    {
        id: 13,
        name: "Pad Thai - Prawns",
        description: "Rice noodles, bean shoots, peanuts, house made sauce",
        price: 35,
        image: Assets.food.generic1,
        category: "noodles-rice",
        tags: ["DF"],
    },
    {
        id: 14,
        name: "Pad Thai - Tofu",
        description: "Rice noodles, bean shoots, peanuts, house made sauce",
        price: 32,
        image: Assets.food.generic1,
        category: "noodles-rice",
        tags: ["V", "VEG", "DF"],
    },
    {
        id: 15,
        name: "Nasi Goreng - Chicken",
        description: "Indonesian chicken fried rice, egg, ginger, garlic, cassava crackers, spring onions, coriander",
        price: 34,
        image: Assets.food.generic4,
        category: "noodles-rice",
        tags: ["DF"],
    },
    {
        id: 16,
        name: "Nasi Goreng - Tofu",
        description: "Indonesian tofu fried rice, egg, ginger, garlic, cassava crackers, spring onions, coriander",
        price: 32,
        image: Assets.food.generic4,
        category: "noodles-rice",
        tags: ["VEG", "DF"],
    },
    // Drinks
    {
        id: 17,
        name: "House Wine",
        description: "Choice of red, white, or rosé",
        price: 45,
        image: Assets.drinks.sake,
        category: "drinks",
        tags: [],
    },
    {
        id: 18,
        name: "Soft Drink",
        description: "Soda, Sprite, Pepsi & Diet Coke",
        price: 6,
        image: Assets.drinks.sake,
        category: "drinks",
        tags: [],
    },
    {
        id: 19,
        name: "Cocktails",
        description: "Aperol Spritz, Gin & Tonic, Mojito",
        price: 23,
        image: Assets.drinks.sake,
        category: "drinks",
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
                        Modern Asian fusion — share plates & interactive dining
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
                    <h3 className="text-sm font-semibold text-white mb-4">Dietary Information</h3>
                    <div className="flex justify-center flex-wrap gap-6 mb-4">
                        <span className="text-sm text-gray-400"><span className="text-[#D4AF37] font-semibold">GF</span> Gluten-Free</span>
                        <span className="text-sm text-gray-400"><span className="text-[#D4AF37] font-semibold">DF</span> Dairy-Free</span>
                        <span className="text-sm text-gray-400"><span className="text-[#D4AF37] font-semibold">V</span> Vegan</span>
                        <span className="text-sm text-gray-400"><span className="text-[#D4AF37] font-semibold">VEG</span> Vegetarian</span>
                    </div>
                    <p className="text-xs text-gray-500 max-w-xl mx-auto">
                        Please inform your server of any allergies or dietary restrictions. GF options available for most dishes. Prices are in AUD.
                    </p>
                </div>
            </section>

            <Footer />
        </main>
    );
}

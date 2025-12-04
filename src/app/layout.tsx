import type { Metadata } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Steam — Modern Asian Fusion",
  description: "Experience the art of modern Asian fusion cuisine. Where tradition meets innovation in an atmosphere of refined luxury.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${playfair.variable} ${manrope.variable} font-sans antialiased`}>
        {/* Grain Overlay */}
        <div className="grain" aria-hidden="true" />
        {children}
        <Toaster />
      </body>
    </html>
  );
}

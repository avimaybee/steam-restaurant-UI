import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/context/cart-context";

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
      <head>
        {/* Load fonts via CSS to avoid Turbopack build issues */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        <CartProvider>
          {/* Grain Overlay */}
          <div className="grain" aria-hidden="true" />
          {children}
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}

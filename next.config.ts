import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true, // Recommended for Cloudflare Pages
  images: {
    unoptimized: true, // Required for Cloudflare Pages
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;


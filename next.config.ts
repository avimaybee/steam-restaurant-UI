import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true, // Recommended for Cloudflare Pages
  eslint: {
    ignoreDuringBuilds: true, // Skip ESLint during build (run it separately)
  },
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


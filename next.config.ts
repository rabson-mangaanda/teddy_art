import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // Imgur (hero + about images from original site)
        protocol: "https",
        hostname: "i.imgur.com",
      },
      {
        // Imgur shortlinks
        protocol: "https",
        hostname: "imgur.com",
      },
      {
        // Supabase Storage (artwork uploads from admin)
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;

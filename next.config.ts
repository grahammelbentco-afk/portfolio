import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export for low-cost hosting (the live site is on GitHub Pages).
  output: "export",
  // next/image optimisation needs a server; derivatives are pre-built by scripts/prepare-images.py.
  images: { unoptimized: true },
  trailingSlash: true,
  reactStrictMode: true,
};

export default nextConfig;

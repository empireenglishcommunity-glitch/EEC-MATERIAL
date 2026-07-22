import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone output → small, self-contained Node server for Docker on the Hetzner VPS.
  output: "standalone",
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;

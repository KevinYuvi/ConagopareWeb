import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Ignora errores de lint en el build
  },
  typescript: {
    ignoreBuildErrors: true, // Ignora errores de tipos en el build
  },
};

export default nextConfig;

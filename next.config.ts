import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  allowedDevOrigins: ['192.168.1.199', '192.168.1.71'],
};

export default nextConfig;

import { LILYPAD } from "@blubberfish/core/config/mfe";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [...LILYPAD.HOST];
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      /** @description Lilypad MFE */
      {
        source: process.env.LILYPAD_MFE_PATH!,
        destination: process.env.LILYPAD_MFE_BASE_URL!,
      },
      {
        source: `${process.env.LILYPAD_MFE_PATH!}/:path+`,
        destination: `${process.env.LILYPAD_MFE_BASE_URL!}/:path+`,
      },
      {
        source: `${process.env.LILYPAD_MFE_ASSET_PATH!}/:path+`,
        destination: `${process.env.LILYPAD_MFE_ASSETS_URL!}/:path+`,
      },
    ];
  },
};

export default nextConfig;

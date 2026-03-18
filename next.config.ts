import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/send-money-canada-to-india/",
        destination: "/guides/send-money-canada-to-india/",
        permanent: true,
      },
      {
        source: "/nre-vs-nro-account-canada-nri/",
        destination: "/guides/nre-vs-nro-account-canada-nri/",
        permanent: true,
      },
      {
        source: "/best-nri-tax-filing-services-2026/",
        destination: "/guides/best-nri-tax-filing-services-2026/",
        permanent: true,
      },
      {
        source: "/nri-itr-filing-deadline-2026-canada/",
        destination: "/guides/nri-itr-filing-deadline-2026-canada/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

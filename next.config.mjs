/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mineskin.eu",
      },
    ],
  },
};

export default nextConfig;

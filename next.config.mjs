/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.igdb.com"], // Add 'images.igdb.com' to allow external images from this domain
  },
};

export default nextConfig;

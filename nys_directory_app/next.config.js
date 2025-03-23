/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [], // Add any image domains you need here
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/nys_directory',
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['mango.blender.org', 'download.blender.org'],
  },
};

module.exports = nextConfig;

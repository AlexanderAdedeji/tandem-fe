import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Add any additional Next.js configuration options here
  // For example, you can customize image domains, webpack config, etc.
};

export default withPWA({
  dest: "public",
   disable: process.env.NODE_ENV === "development",
  // disable:false
})(nextConfig);

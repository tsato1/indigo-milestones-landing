import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flagsapi.com"
      },
    ]
  }
};
 
export default withNextIntl(nextConfig);

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "d3qedcypyw35cj.cloudfront.net" },
    ],
  },
};

module.exports = nextConfig;

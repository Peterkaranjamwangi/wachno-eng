/** @type {import('next').NextConfig} */
const nextConfig = {
  // images: {
  //   domains: ["localhost"],
  //   remotePatterns: [
  //     {
  //       protocol: "https",
  //       hostname: "cdn.sanity.io",
  //       port: "",
  //     },
  //     {
  //       protocol: "https",
  //       hostname: "dummyimage.com",
  //       port: "",
  //       pathname: "/*",
  //     },
  //   ],
  // },
  images: {
    domains: ["cdn.sanity.io", "dummyimage.com", "images.unsplash.com"],
    // Add other image domains if necessary
  },
};

module.exports = nextConfig;

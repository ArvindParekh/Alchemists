/** @type {import('next').NextConfig} */
import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  cacheOnFrontEndNav: true,
  swSrc: "src/sw.js", // add the path where you create sw.ts
  swDest: "public/sw.js",
  reloadOnOnline: true,
  // disable: process.env.NODE_ENV === "development",
  // ... other options
});

const nextConfig = {
  output: "export",
  swcMinify: true,
  reactStrictMode: true,
  // ... other next.js config options
};

export default withSerwist(nextConfig);

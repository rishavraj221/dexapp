/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: {
    globalObject: "this",
  },
  images: {
    loader: "imgix",
    path: "https://noop/",
  },
};

module.exports = nextConfig;

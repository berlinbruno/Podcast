/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "localhost",
      },
      {
        hostname: "podcast-backend-kjdvvo3kxq-el.a.run.app",
      },
      {
        hostname: "storage.googleapis.com",
      },
    ],
  },
};

export default nextConfig;

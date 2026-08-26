/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  // Redirect old page structure (removed in the site simplification) to
  // their closest equivalent in the new structure, so previously indexed
  // URLs and any existing inbound/bookmarked links don't 404.
  async redirects() {
    return [
      { source: "/services", destination: "/about", permanent: true },
      { source: "/services/:slug", destination: "/about", permanent: true },
      { source: "/industries", destination: "/about", permanent: true },
      { source: "/industries/:slug", destination: "/about", permanent: true },
      { source: "/sertifikasi", destination: "/about", permanent: true },
      { source: "/capabilities", destination: "/about", permanent: true },
      { source: "/insights", destination: "/", permanent: true },
      { source: "/insights/:slug", destination: "/", permanent: true },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;

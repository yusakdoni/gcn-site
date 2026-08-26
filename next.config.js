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

  // Redirect old page structure to their equivalent in the current
  // structure, so previously indexed URLs and any existing inbound/
  // bookmarked links don't 404. Two generations of restructuring are
  // covered here: v8.1.8 (About/Projects/Contact + removed Industries/
  // Sertifikasi/Capabilities/Insights) and v8.2.1 (renamed to the
  // Services/Our Work/Client Impact/Company/Work With Us structure).
  async redirects() {
    return [
      // v8.2.1 renames
      { source: "/about", destination: "/company", permanent: true },
      { source: "/projects", destination: "/our-work", permanent: true },
      { source: "/projects/:slug", destination: "/our-work/:slug", permanent: true },
      { source: "/contact", destination: "/work-with-us", permanent: true },

      // v8.1.8 removals (services now exists again as a real page —
      // deliberately NOT redirected)
      { source: "/industries", destination: "/company", permanent: true },
      { source: "/industries/:slug", destination: "/company", permanent: true },
      { source: "/sertifikasi", destination: "/company", permanent: true },
      { source: "/capabilities", destination: "/company", permanent: true },
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

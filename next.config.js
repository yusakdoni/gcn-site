/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: `next build` now emits plain HTML/CSS/JS into /out.
  // No Node.js process is needed to serve the site anymore - Apache/LiteSpeed
  // serves the files directly, which avoids the cPanel/LVE process & CPU
  // limits that were causing images to fail and the 503 on www.
  output: "export",

  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  // NOTE: the `headers()` function only works when Next.js runs as a server
  // (it did nothing useful under Node/Passenger on this host either, since
  // Apache sits in front of it). The same security headers are now set via
  // .htaccess (see /public/.htaccess) so they still apply to the exported
  // static site.
};

module.exports = nextConfig;
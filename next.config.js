const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "www.joblo.com",
      "www.wallpaperflare.com",
      "www.filmonpaper.com",
      "justalrightreviewsdotcom.files.wordpress.com",
      "c4.wallpaperflare.com",
      "images.unsplash.com",
      "i.ibb.co",
      "image.tmdb.org",
      "lh3.googleusercontent.com",
    ],
  },
};

module.exports = nextConfig;

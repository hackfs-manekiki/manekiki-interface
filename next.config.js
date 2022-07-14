const { withSentryConfig } = require("@sentry/nextjs");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [];
  },
  images: {
    domains: [],
  },

  sentry: {
    disableServerWebpackPlugin: !["production"].includes(
      process.env.NEXT_PUBLIC_APP_ENV || "local",
    ),
    disableClientWebpackPlugin: !["production"].includes(
      process.env.NEXT_PUBLIC_APP_ENV || "local",
    ),
  },

  webpack: (config, _context) => {
    config.plugins = config.plugins || [];

    config.module.rules.push({
      test: /\.svg$/i,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: "removeViewBox",
                  active: false,
                },
              ],
            },
          },
        },
      ],
    });

    /* For transforming images to base64-embedded in the bundle */
    config.module.rules.push({
      test: /\.(png|jpg|gif)$/i,
      use: {
        loader: "url-loader",
        options: {
          limit: 8192,
        },
      },
    });

    return config;
  },
};

module.exports = withBundleAnalyzer(withSentryConfig(nextConfig));

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
const nextConfig = {
  async headers() {
    return [
      {
        source: "/graphql",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ]
  },
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (!isServer) {
      // config.node = {
      //   fs: null,
      // }
    }

    config.resolve.modules = ["./node_modules", "./modules"]
    config.experiments = {
      topLevelAwait: true,
    }
    return config
  },
  images: {
    domains: ["[2a00:bc00:8800:9c37:168c:4be0:44e0:bbdd]"],
  },
}

module.exports = withBundleAnalyzer(nextConfig)

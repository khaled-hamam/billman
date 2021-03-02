// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    src: '/',
    public: '/',
    assets: {
      url: '/assets',
      static: true,
    }
  },
  plugins: [
    "@snowpack/plugin-dotenv",
    [
      "@snowpack/plugin-build-script",
      {
        "cmd": "postcss",
        "input": [
          ".css",
        ],
        "output": [
          ".css",
        ],
      },
    ],
  ],
  packageOptions: {
    /* ... */
  },
  devOptions: {
    port: 80,
  },
  buildOptions: {
    /* ... */
  },
};

const { withEsbuildOverride } = require("remix-esbuild-override");
const remixServiceBindings = require("remix-service-bindings").default;

withEsbuildOverride((option, { isServer }) => {
  if (isServer) {
    option.plugins = [
      /**
       * remixServiceBindings
       * @param isEdgeSide {boolean} - When this is true, the build is for edge (binder) and when false, the build is for bindee.
       *                               (Deployment (build) must be done in two parts.)
       * @param bindingsName {string} - The bind name set in toml. This name will be converted to a bind object.
       * @param enabled {boolean} - If this is false, this plugin is disabled.
       */
      remixServiceBindings(!process.env.BINDEE, "BINDEE", !!process.env.DEPLOY),
      ...option.plugins,
    ];
  }

  return option;
});

/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  serverBuildTarget: "cloudflare-workers",
  server: "./server.js",
  devServerBroadcastDelay: 1000,
  ignoredRouteFiles: ["**/.*"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
};

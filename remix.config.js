/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  serverBuildTarget: "cloudflare-pages",
  server: "./server.js",
  devServerBroadcastDelay: 1000,
  ignoredRouteFiles: ["**/.*"],
    appDirectory: "app",
   assetsBuildDirectory: "public/build",
   serverBuildDirectory: "build",
   serverBuildPath: "functions/[[path]].js",
   publicPath: "/build/",
};

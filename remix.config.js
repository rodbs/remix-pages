/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  serverBuildTarget: 'cloudflare-pages',
  server: './server.ts',
  devServerBroadcastDelay: 1000,
  ignoredRouteFiles: ['**/.*'],
  appDirectory: 'app',
  //assetsBuildDirectory: 'public/build',
  //serverBuildDirectory: 'build',
  // serverBuildPath: 'functions/[[path]].js',
  serverBuildPath: 'public/_worker.js',
  publicPath: '/build/',
}

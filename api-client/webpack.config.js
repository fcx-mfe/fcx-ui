const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "fcx",
    projectName: "api-client",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    resolve: {
      fallback: {
        crypto: require.resolve("crypto-browserify"),
        stream: require.resolve("stream-browserify"),
        vm: require.resolve("vm-browserify"),
        // Add other fallbacks if needed
      },
    },
    // Optionally, you may also need to include the following:
    // plugins: [
    //   new webpack.ProvidePlugin({
    //     process: "process/browser",
    //   }),
    // ],
  });
};

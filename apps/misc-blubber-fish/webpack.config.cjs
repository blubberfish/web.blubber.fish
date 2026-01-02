const HtmlPlugin = require("html-webpack-plugin");
const path = require("path");
const { DefinePlugin } = require("webpack");

const port = process.env.PORT || 8000;

/** @type {import('webpack').Configuration} */
module.exports = {
  devServer: {
    allowedHosts: "all",
    compress: true,
    historyApiFallback: true,
    hot: 'only',
    port,
  },
  entry: {
    "bf/core": path.resolve("./src/core/index.ts"),
    "bf/web": path.resolve("./src/sdk/index.ts"),
  },
  module: {
    rules: [
      {
        test: /\.[cm]?[jt]sx?$/i,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-typescript"],
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    clean: true,
    path: path.resolve("./dist"),
  },
  plugins: [
    new DefinePlugin({
      WEBSYNC_URL: JSON.stringify(`http://localhost:${port}`),
    }),
    new HtmlPlugin({
      chunks: ["bf/core"],
      inject: "head",
      meta: { viewport: "width=device-width, initial-scale=1" },
      minify: true,
      scriptLoading: "blocking",
      title: "web-sync",
    }),
  ],
  resolve: {
    extensions: [".ts", ".js"],
  },
};

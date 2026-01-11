const HtmlPlugin = require("html-webpack-plugin");
const path = require("path");
const { DefinePlugin } = require("webpack");
const { version } = require("./package.json");

const port = process.env.PORT || 8000;

/** @type {import('webpack').Configuration} */
module.exports = {
  devServer: {
    allowedHosts: "all",
    compress: true,
    historyApiFallback: true,
    hot: "only",
    port,
  },
  entry: {
    main: "./src/portal/index.ts",
    "integrations/web": "./src/client/index.ts",
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
      __FRAME_URL__: JSON.stringify(`http://localhost:${port}`),
      __VERSION__: JSON.stringify(version),
    }),
    new HtmlPlugin({
      chunks: ["main"],
      inject: "head",
      meta: { viewport: "width=device-width, initial-scale=1" },
      minify: true,
      scriptLoading: "async",
      title: "web-sync",
    }),
  ],
  resolve: {
    extensions: [".ts", ".js"],
  },
};

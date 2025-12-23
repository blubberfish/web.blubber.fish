import HtmlPlugin from "html-webpack-plugin";
import path from "path";

/** @type {import('webpack').Configuration} */
export default {
  devServer: {
    port: process.env.PORT || 8000,
  },
  entry: {
    main: path.resolve("./src/index.ts"),
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
    new HtmlPlugin({
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

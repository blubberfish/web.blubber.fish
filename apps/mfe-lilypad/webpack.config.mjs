import { GLOBAL_KEY } from "@blubberfish/nebula/config";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";

/** @type {import("webpack").Configuration} */
export default [
  {
    mode: process.env.NODE_ENV || "development",
    entry: {
      debug: "./src/index.tsx",
      app: "./src/app/index.tsx",
    },
    output: {
      path: path.resolve(process.cwd(), "dist"),
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.[cm]?[jt]sx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-typescript",
                ["@babel/preset-react", { runtime: "automatic" }],
              ],
            },
          },
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    },
    plugins: [
      new HtmlWebpackPlugin({
        chunks: ["main"],
      }),
    ],
    devServer: {
      compress: true,
      port: 8000,
      hot: true,
      historyApiFallback: true,
    },
    devtool: "source-map",
    externals: {
      react: `window[${JSON.stringify(GLOBAL_KEY)}].React`,
    },
  },
];

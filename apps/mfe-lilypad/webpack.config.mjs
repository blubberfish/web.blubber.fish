import { GLOBAL_KEY } from "@blubberfish/nebula/config";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";

const generalOutputPath = path.resolve(process.cwd(), "dist");

const mode = process.env.NODE_ENV || "development";

/** @type {Partial<import("webpack").Configuration>} */
const commonConfig = {
  devtool: "source-map",
  mode,
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
};

/** @type {import("webpack").Configuration} */
export default [
  {
    ...commonConfig,
    entry: {
      debug: "./src/index.tsx",
    },
    output: {
      clean: true,
      path: path.join(generalOutputPath, "debug"),
    },
    plugins: [
      new HtmlWebpackPlugin({
        scriptLoading: "module",
        chunks: ["debug"],
      }),
    ],
    devServer: {
      compress: true,
      port: 8000,
      hot: true,
      historyApiFallback: true,
      static: ["dist/static"],
    },
  },
  {
    ...commonConfig,
    entry: {
      app: "./src/app/export.ts",
    },
    experiments: {
      outputModule: true,
    },
    externals: {
      react: `window[${JSON.stringify(GLOBAL_KEY)}].React`,
    },
    output: {
      clean: true,
      path: path.join(generalOutputPath, "static"),
    },
  },
];

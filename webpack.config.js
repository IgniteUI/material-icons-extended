import path from "path";
const __dirname = path.resolve();

const config = {
  entry: "./src/index.ts",
  mode: "production",
  module: { 
    rules: [
      {
        test: /\.svg/,
        type: 'asset/source'
      },
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".svg"],
  },
  experiments: {
    outputModule: true
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "build/src/"),
    library: {
      type: "module"
    }
  },
};

export default config;

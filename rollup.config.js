import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import svg from "rollup-plugin-svg";
import css from "rollup-plugin-css-only";
import { terser } from "rollup-plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { visualizer } from "rollup-plugin-visualizer";

const packageJson = require("./package.json");

export default {
  input: "./index.js", // Entry point for your library
  output: [
    {
      file: packageJson.main, // CommonJS output
      format: "cjs",
      sourcemap: true,
    },
    {
      file: packageJson.module, // ES module output
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
      presets: [
        "@babel/preset-env",
        "@babel/preset-react", // Add this preset for JSX
      ],
      // plugins: [
      //   // Optionally, add this plugin for the new JSX transform (if using React 17+)
      //   ["@babel/plugin-transform-react-jsx", { runtime: "automatic" }],
      // ],
    }),
    css(),
    svg(),
    commonjs(),
    terser(),
    visualizer(),
  ],
};

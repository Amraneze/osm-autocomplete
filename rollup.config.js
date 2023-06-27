import dts from "rollup-plugin-dts";
import autoprefixer from 'autoprefixer';
import postcss from "rollup-plugin-postcss";
import { uglify } from "rollup-plugin-uglify";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import packageJson from "./package.json" assert { type: "json" };

export default [
  {
    input: "src/index.ts",
    external: [...Object.keys(packageJson.peerDependencies || {}), 'react/jsx-runtime'],
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        format: "esm",
        file: packageJson.module,
        sourcemap: true,
      },
    ],
    plugins: [
      uglify(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
      }),
      postcss({
          plugins: [autoprefixer()],
          namedExports: true,
          sourceMap: true,
          extract: false,
          autoModules: true,
          minimize: true,
          extensions: [".scss"],
          use: ["sass"],
      }),
    ],
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [/\.scss$/],
  },
];

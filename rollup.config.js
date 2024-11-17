import { terser } from "rollup-plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
    input: "src/index.js",
    output: [
        {
            file: "dist/index.esm.js",
            format: "es",
        },
        {
            file: "dist/index.min.js",
            format: "umd",
            name: "Papadam",
        },
    ],
    plugins: [resolve(), commonjs(), terser()],
};

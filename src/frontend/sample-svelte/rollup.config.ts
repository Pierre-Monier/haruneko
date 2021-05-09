import preprocess from 'svelte-preprocess';
import { terser as minify } from "rollup-plugin-terser";
import commonjs from "@rollup/plugin-commonjs";
import copy from 'rollup-plugin-copy';
import resolve from "@rollup/plugin-node-resolve";
import svelte from "rollup-plugin-svelte";
import typescript from '@rollup/plugin-typescript';
import livereload from "rollup-plugin-livereload";
import postcss from 'rollup-plugin-postcss';
import { optimizeCss, optimizeImports } from "carbon-preprocess-svelte";

const isProduction = process.env.ROLLUP_WATCH !== 'true';

export default {
    input: {
        'frontend/SampleSvelte': 'src/frontend/sample-svelte/Frontend.ts'
    },
    output: [
        {
            dir: 'build.web',
            format: 'es',
            sourcemap: true
        }
    ],
    plugins: [
        svelte({
            //dev: !isProduction,
            preprocess: [preprocess({ sourceMap: !isProduction }), optimizeImports(), optimizeCss()]
            //css: css => css.write('css/sample-svelte.css')
        }),
        postcss({
            extract: 'css/sample-svelte.css'
        }),
        copy({
            targets: [
                { src: 'src/frontend/sample-svelte/theme', dest: 'build.web/css' },
                { src: 'node_modules/carbon-components-svelte/css/all.css', dest: 'build.web/css/theme' },
            ]
        }),
        resolve({
            browser: true,
            dedupe: ["svelte"]
        }),
        commonjs(),
        typescript(),
        !isProduction && livereload("build.web"),
        isProduction && minify()
    ]
};
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'
import { uglify } from 'rollup-plugin-uglify';
let pkg = require('./package.json');

const banner =
    '/*!\n' +
    ` * musee.js v${pkg.version}\n` +
    ` * (c) 2019/${new Date().getMonth() + 1}/${new Date().getDate()} Clear\n` +
    ' * Released under the MIT License.\n' +
    ' */'


export default {
    input: './src/index.js',
    output: [
        {
            file: 'dist/musee.cjs.js',
            format: 'cjs',
            banner
        },
        {
            file: './dist/musee.js',
            format: 'umd',
            name: 'musee',
            sourcemap: true,
            banner

        },
        {
            file: 'dist/musee.iife.js',
            format: 'iife',
            name: 'musee',
            banner
        }
    ],
    plugins: [
        babel({
            exclude: 'node_modules/**'
        }),
        resolve({
            jsnext: true,
            main: true,
            browser: true
        }),
        commonjs({
            include: ['umd.js'],
            namedExports: {
                'umd.js': [ 'Realtime' ]
            }
        }),
        postcss({
            autoprefixer,
            // minimize: true,
            extensions: [ '.css' ],
            extract: true
        }),
    ]
}

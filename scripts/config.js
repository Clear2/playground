import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
let pkg = require('../package.json');

const banner =
    '/*!\n' +
    ` * musee.js v${pkg.version}\n` +
    ` * (c) 2019/${new Date().getMonth() + 1}/${new Date().getDate()} Clear\n` +
    ' * Released under the MIT License.\n' +
    ' */'

function external(id) {
    return id in pkg.dependencies || id in pkg.peerDependencies || ['path'].includes(id)
}

let plugins= [
    commonjs(),
    babel({
        exclude: 'node_modules/**',
        runtimeHelpers: true,
    }),
    uglify(),
]

export default {
    input: './src/index.js',
    output: [
        {
            file: 'dist/musee.js',
            format: 'cjs',
            banner
        },
    ],
    plugins: [
        commonjs(),
    ],
}

const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        app: './src/main.js'
    },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].chunk.js',
        publicPath: '/',
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            name: false,
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'App',
            template: 'public/index.html',
            filename: 'index.html',
            inject: 'body',
            minify: {
                removeComments: true,
            },
        })
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            // cannon: path.resolve(__dirname, './src/lib/cannon/cannon.js')
        },
        extensions: ['.tsx', '.ts', '.js', 'jsx'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env", ["@babel/preset-react", {"runtime": "automatic"}]],
                            plugins: [
                                '@babel/plugin-transform-runtime',
                                '@babel/plugin-proposal-class-properties',
                            ]
                        },
                    },
                ],
            },

            {
                test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
                type: 'asset'
            },
        ]
    }
}

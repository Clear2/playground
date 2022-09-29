const {merge} = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
    target: 'web',
    mode: 'development',
    stats: 'errors-only', //只在发生错误或有新的编译时输出
    devServer: {
        port: 3000,
        client: {
            logging: 'error',
        },
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.s?css$/i,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    'postcss-loader',
                    'sass-loader',
                ],
            }
        ]
    }
})
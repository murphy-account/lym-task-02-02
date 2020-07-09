const path = require('path')
const dotenv = require('dotenv')
const webpack = require('webpack')
// const CopyWebpackPlugin = require('copy-webpack-plugin') //生成一个使用打包后的js文件的html
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
/** @type {import('webpack').Configuration} */
const env = process.env.NODE_ENV || 'production'
dotenv.config({ path: '.env.' + env }) //load .env.production
dotenv.config()//load .env
const envs = Object.keys(process.env).reduce((e, i) => {
    if (i.startsWith('MY_')) {
        e[i] = JSON.stringify(process.env[i])
    }
    return e
}, {})
console.log("envs", envs)
module.exports = {
    mode: 'none',
    entry: './src/main.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'js/bundle[contenthash:6].js'
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.css/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: 'img/[name].[contenthash:6].[ext]',
                        esModule:false,
                        limit: 1
                    }
                }
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            title: 'Vue App'
        }),
        new webpack.DefinePlugin({
            BASE_URL: '"/"'
        }),
        
    ]
}
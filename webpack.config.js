const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    context: path.resolve(__dirname,'src'),
    mode: 'development',
    entry: {
        main:'./script.js',
    },
    output: {
        assetModuleFilename: "img-background/[hash][ext][query]",
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        port:4200,
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: "./index.html"
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename:'[name].[contenthash].css',
        }),
        new CopyWebpackPlugin({
            patterns:[
                {from: path.resolve(__dirname, "src/img") , to: path.resolve(__dirname,"dist/img")}
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use:[{
                    loader: MiniCssExtractPlugin.loader,
                }, 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test:/\.(ttf|woff|woff2|eot)$/,
                use:['file-loader']
            },
            {
                test: /\.s[ac]ss$/,
                use:[
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    }
}
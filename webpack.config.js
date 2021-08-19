const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin');

const path = require("path");

const config = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'build'),
        compress: true,
        hot: true,
        inline: true,
        port: 5000,
        host: '0.0.0.0',
        historyApiFallback: { index: "/" },
    },
    entry: {
        main: ["@babel/polyfill", path.join(__dirname, "src", "index.tsx")]
    },
    output: {
        path: path.join(__dirname, "build"),
        filename: "[name].js",
        publicPath: "/"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".scss"],
    },
    target: 'web',
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        babelrc: false,
                        presets: [
                            [
                                "@babel/preset-env"
                            ],
                            "@babel/preset-typescript",
                            "@babel/preset-react"
                        ],
                        plugins: [
                            ["@babel/plugin-proposal-class-properties"],
                            ["@babel/plugin-transform-runtime"]
                        ]
                    }
                }
            },
            { test: /\.s?css/, use: ['style-loader','css-loader', 'sass-loader'] },
            {
                test: /\.(gif|png|svg|jpg)/,
                loader: 'url-loader',
                options: {
                    esModule: false,
                }
            }
        ]
    },
    plugins: [
        // plugins should not be empty: https://github.com/aspnet/JavaScriptServices/tree/dev/src/Microsoft.AspNetCore.SpaServices'[
        new HtmlWebpackPlugin({
            title: 'Diagram Example',
            inject: true,
            release: false,
            minify: {
                collapseWhitespace: false,
                removeComments: false
            }
        }),
        new HtmlWebpackPartialsPlugin({
            path: path.join(__dirname, 'body.html')
        })
    ].filter(Boolean)
};

module.exports = config;

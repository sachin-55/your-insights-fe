const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path')
const Fiber = require('fibers');
const webpack = require("webpack");
const dotenv = require("dotenv");


const env = dotenv.config({ path: `${__dirname}/config.env` }).parsed;

// reduce it to a nice object, the same as before
const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});
  
  // const PORT = process.env.PORT;

module.exports = {
    entry: [
        'react-hot-loader/patch', // RHL patch
        './index.js' // Your appʼs entry point
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'index_bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.(s[ac]ss|css)$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('dart-sass'),
                            sassOptions: {
                                fiber: Fiber,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
        ]
    },
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',

    plugins: [
        new HtmlWebPackPlugin({
            template: "./index.html",
            filename: "./index.html"
        }),
        new webpack.DefinePlugin(envKeys)
    ],
    devServer: {
        contentBase: "./build",
        host: 'localhost',
        port: process.env.PORT,
        historyApiFallback: true,
        open: true,
        inline: true,
        hot: true,
    },
};
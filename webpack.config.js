const webpack = require('webpack');
const meteorExternals = require('webpack-meteor-externals');
const nodeExternals = require('webpack-node-externals');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const clientConfig = {
    mode: 'development',
    target: 'web',
    entry: './client/main.coffee',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
    },
    output: {
        publicPath: '/'
    },
    externals: [meteorExternals()],
    // plugins: [
    //     new webpack.HotModuleReplacementPlugin(),
    //     new HtmlWebpackPlugin({
    //         template: './client/index.html',
    //         hash: true
    //     })
    // ]
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader'],
            },
            {
                test: /\.coffee$/,
                use: [ 'coffee-loader' ]
            },
            {
                test: /\.html$/i,
                loader: 'spacebars-loader',
            },
        ],
    },
};

const serverConfig = {
    mode: 'development',
    target: 'node', // in order to ignore built-in modules like path, fs, etc.
    externals: [
        meteorExternals(),
        nodeExternals()
    ], // in order to ignore all modules in node_modules folder
    entry: './server/main.coffee',
    // devServer: {
    //     hot: true
    // },
    module: {
        rules: [
            // {
            //     test: /\.css$/,
            //     use: ['style-loader', 'css-loader'],
            // },
            // {
            //     test: /\.(png|svg|jpg|gif)$/,
            //     use: ['file-loader'],
            // },
            {
                test: /\.coffee$/,
                use: [ 'coffee-loader' ]
            }
        ],
    },
};

module.exports = [clientConfig, serverConfig];
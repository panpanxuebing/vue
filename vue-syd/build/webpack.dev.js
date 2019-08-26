const path = require('path');
const merge = require('webpack-merge');
const webpackConfig = require('./webpack.base');
const webpack = require('webpack');

module.exports = merge(webpackConfig, {
    mode: 'development',
    devtool: 'cheap-eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        }),
    ],
    devServer: {
        hot: true,
        port: 3001,
        contentBase: path.join(__dirname, 'dist'),
        // proxy: {
        //     '/syd-paper/': {
        //         target: 'http://192.168.1.56:18080',
        //         changeOrigin: true
        //     }
        // }
    },
});
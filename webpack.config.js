const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: ['babel-polyfill', './src/main.js'],
    output: {
        path: __dirname + '/public/build/',
        publicPath: 'build/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!autoprefixer-loader',
                exclude: [/node_modules/, /public/]
            }
        ]
    }
}

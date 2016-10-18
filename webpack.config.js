const join = require('path').join;
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const src = join(__dirname, 'client/src');
const target = join(__dirname, 'client/public');

module.exports = {
    devtol: 'eval',
    entry: `${src}/index.jsx`,
    output: {
        path: target,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx|\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('css?sourceMap!less?sourceMap')
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&name=/[name].[ext]&mimetype=application/font-woff"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader?name=/[name].[ext]"
            }
        ]
    },
    resolve: {
        extensions: ['', '.jsx', '.js', '.json', '.less'],
        alias: {
            components: join(src, 'components'),
            services: join(src, 'services'),
            less: join(src, 'less')
        }
    },
    plugins: [
        new ExtractTextPlugin('bundle.css'),
        new webpack.ProvidePlugin({
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        })
    ],
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                secure: false
            }
        }
    }
};
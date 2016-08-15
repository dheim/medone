const webpack = require('webpack');
const path = require('path');

const SRC_DIR = path.resolve(__dirname, 'client/src');
const BUILD_DIR = path.resolve(__dirname, 'client/public');

var config = {
    entry: SRC_DIR + '/js/index.jsx',
    output: {
        path: BUILD_DIR,
        filename: 'js/bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?/,
                include: SRC_DIR + '/js',
                loader: 'babel'
            }
        ]
    }
};

module.exports = config;
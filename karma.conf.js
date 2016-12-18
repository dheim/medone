// configured karma following these tips:
// http://mike-ward.net/2015/09/07/tips-on-setting-up-karma-testing-with-webpack/

var path = require('path');

var webpackConfig = require('./webpack.config');
webpackConfig.entry = {};

// as the json loader is used for the tests only, we add it here
webpackConfig.module.loaders.push(
    {
        test: /\.json$/,
        loader: 'json'

    });

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            './client/test/**/*.spec.js'
        ],
        preprocessors: {
            // add webpack as preprocessor
            'client/src/**/*.js': ['webpack', 'sourcemap'],
            'client/test/**/*.js': ['webpack', 'sourcemap']
        },
        webpack: webpackConfig,
        webpackServer: {
            noInfo: true //please don't spam the console when running in karma!
        },
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,
    })
};

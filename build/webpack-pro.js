const webpack = require('./webpack-base');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CSSPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = webpack.conf;
module.exports.mode = 'production';
module.exports.output = {
    filename: '[name].zzxp.js',
    path: path.resolve(__dirname, "../", "dist"),
    //根据服务器路径设置
    publicPath: './',
};

module.exports.plugins = module.exports.plugins || [];
module.exports.plugins.push(new UglifyJSPlugin({
    uglifyOptions: {
        compress: {
            warnings: false
        }
    },
    sourceMap: true,
    parallel: true
}));
module.exports.plugins.push(new CSSPlugin({
    cssProcessorOptions: {safe: true, map: {inline: false}}
}));
module.exports.plugins.push(new HtmlWebpackPlugin({
    title: "自在小铺",
    template: path.resolve(__dirname, "./", 'index-pro.html'),
    inject: "body",
    favicon: "",
    minify: {
        caseSensitive: false,
        collapseBooleanAttributes: true,
        collapseWhitespace: true
    },
    hash: true,
    cache: true,
    showErrors: true,
    chunks: "",
    chunksSortMode: "auto",
    excludeChunks: "",
    xhtml: false
}));

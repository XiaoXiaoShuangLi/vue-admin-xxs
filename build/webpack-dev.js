const webpackBase = require('./webpack-base');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');


module.exports = webpackBase.conf;
module.exports.watch = true;
// module.exports.devtool = '#source-map';
module.exports.devtool = '#cheap-module-source-map';
module.exports.output = module.exports.output || {};
module.exports.plugins = module.exports.plugins || [];
module.exports.plugins.push(new HtmlWebpackPlugin({
    title: "自在小铺",
    template: path.resolve(__dirname, "./", 'index-dev.html'),
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
module.exports.devServer = {
    // 启动的服务端口
    port: 8080,
    // 通过localhost或IP进行访问
    host: '0.0.0.0',
    // 若编译过程中有错误，显示到网页上,便于定位错误
    overlay: {
        errors: true,
    },
    inline: true,
    historyApiFallback: true,
    //热加载
    hot: true,
    //指定html编译后的路径
    contentBase: path.resolve(__dirname, "../", "out"),
    //输出错误内容
    stats: "errors-only",
    //压缩
    compress: false,
};
console.log('....');
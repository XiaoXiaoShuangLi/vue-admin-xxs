const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');

exports.conf = {
    entry: {
        app: path.resolve(__dirname, "../", "src", "main.ts"),
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, "../", "out"),
        publicPath: '/',
    },
    mode: 'development',
    target: 'web',
    resolve: {
        extensions: ['.ts', '.js', '.html'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    sourceMap: true
                }
            },
            {
                test: /\.ts$/,
                enforce: 'pre',
                loader: 'tslint-loader',
                options: {}
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/],

                }
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    esModule: false,
                    limit: 10000,
                    name: 'img/[name].[hash:7].[ext]',
                }
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader',
                    }, {
                        loader: 'css-loader',
                    }, {
                        loader: 'less-loader',
                        options: {
                            modifyVars: {
                                'border-radius-base': '0px',
                            },
                            javascriptEnabled: true,
                        },
                    }]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    esModule: false,
                    limit: 10000,
                    name: 'fonts/[name].[hash:7].[ext]'
                }
            },
            {test: /\.html$/, loader: "string-loader"},
            {test: /\.scss$/, loader: "vue-style-loader!style-loader!css-loader!sass-loader"}
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    ]
};

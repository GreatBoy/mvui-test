//webpack.config.js  
var webpack = require('webpack');
var path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
    plugins: [commonsPlugin, new HtmlWebpackPlugin({
        template: './src/index.html'
    })],
    // 入口文件  
    entry: {
        build: "./src/main.js"
    },
    // 编译输出的文件路径  
    output: {
        publicPath: './',
        path: './dist/',
        filename: "[name].bundle.js"
    },
    //加载器  
    module: {
        loaders: [{
                test: /node_modules\/mvui\/.*?js$/,
                loader: 'babel'
            }, // for Mac, 
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            }, {
                test: /\.vue$/,
                loader: 'vue'
            },



            {
                test: /\.less$/,
                loader: "style!css!less"
            }, {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: 'style-loader!css-loader'
            }, {
                test: /\.eot/,
                loader: 'file?prefix=font/'
            }, {
                test: /\.woff/,
                loader: 'file?prefix=font/&limit=10000&mimetype=application/font-woff'
            }, {
                test: /\.ttf/,
                loader: 'file?prefix=font/'
            }, {
                test: /\.svg/,
                loader: 'file?prefix=font/'
            },




            //图片转化，小于8K自动转化为base64的编码
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192'
            }
        ]
    },
    vue: {
        loaders: {
            js: 'babel'
        }
    },
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    },
    resolve: {
        // require时省略的扩展名，如：require('app') 不需要app.js
        extensions: ['', '.js', '.vue'],
        // 别名，可以直接使用别名来代表设定的路径以及其他
        alias: {
            filter: path.join(__dirname, './src/filters'),
            components: path.join(__dirname, './src/components')
        }
    }
}

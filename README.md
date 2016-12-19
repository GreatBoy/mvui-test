# mvui 安装步骤



### 一、准备好html代码，例如src/index.html,在页面中添加 rem 适配代码。
<script>
(function(win) {
    var doc = win.document,
        html = doc.documentElement,
        scale = 16,
        resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize';
    function calculate(){
        windowWidth = html && html.clientWidth || win.innerWidth;
        windowHeight = html && html.clientHeight || win.innerHeight;
        deviceAgent = navigator.userAgent.toLowerCase();
        scale = parseFloat(windowWidth / 3.2);
        // 修复微信2.3系统bug
        if (deviceAgent.match(/android\s*2.3/) && deviceAgent.match(/micromessenger/)) {
            scale = 16;
        }
        if( scale > 150 ){
            scale = 150;
        }
        html.style.fontSize = scale + 'px';
    }
    html.style.opacity = 0;   // 未渲染出来先把页面隐藏 
    win.addEventListener(resizeEvent, function() {
        calculate();
    }, false);
    doc.addEventListener('DOMContentLoaded', function() {
        calculate();
        body = doc.body;
        body.style.width = '3.2rem';
        body.style.fontSize = '0.13rem';
        body.style.margin = '0px auto';
        html.style.opacity = 1;
    }, false);
})(window);
</script>


### 二、其次在页面中加入fastclick.js，这个静态文件可以自己定义如何引入

``` javascript
<script src="../static/fastclick.js"></script>
<script>
    window.addEventListener('load', function() {
      FastClick.attach(document.body);
    }, false);
</script>
```


### 三、准备 package.json 文件，把mvui添加到依赖中，npm install 安装
{
  "name": "mvui_test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "mvui": "^1.0.0",
    "vue": "^1.0.26",
    "yargs": "^5.0.0"
  },
  "devDependencies": {
    "babel-core": "^6.11.4",
    "babel-loader": "^6.2.4",
    "babel-plugin-transform-runtime": "^6.9.0",
    "babel-preset-es2015": "^6.9.0",
    "babel-preset-stage-0": "^6.5.0",
    "babel-runtime": "^6.9.2",
    "autoprefixer-loader": "^2.0.0",
    "css-loader": "^0.23.1",
    "eslint": "^2.5.3",
    "eslint-friendly-formatter": "^2.0.6",
    "eslint-loader": "^1.3.0",
    "extract-text-webpack-plugin": "^1.0.1",
    "file-loader": "^0.9.0",
    "html-webpack-plugin": "^2.22.0",
    "jade": "^1.11.0",
    "less": "^2.7.1",
    "less-loader": "^2.2.3",
    "style-loader": "^0.13.1",
    "stylus-loader": "^1.4.2",
    "template-html-loader": "0.0.3",
    "url-loader": "^0.5.7",
    "vue-hot-reload-api": "^1.3.2",
    "vue-html-loader": "^1.2.2",
    "vue-loader": "^8.5.2",
    "vue-router": "^0.7.13",
    "vue-style-loader": "^1.0.0",
    "webpack": "^1.13.1",
    "webpack-merge": "^0.13.0",
    "webpack-dev-server": "^1.14.1"
  }
}



### 四、配置webpack文件


1) webpack.config.js  配置loaders 把以下代码加入到配置中，

``` javascript
{
    test: /node_modules\/mvui\/.*?js$/,
    loader: 'babel'
}, // for Mac,
```

2) webpack.config.js 如下


``` javascript
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
```







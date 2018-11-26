// 导入处理路径的模块
var path = require('path');
var VueLoaderPlugin = require('vue-loader/lib/plugin.js');

// 导入一个配置对象, [webpack 在启动的时候,会默认查找webpack.config.js,并读取这个文件中导出的配置对象,来进行打包处理]
module.exports = {
    mode:"development",
    entry: path.join(__dirname, 'src/main.js'), //项目入口文件
    output: { //打包后的项目出口文件
        path: path.join(__dirname, 'dist'), //配置输出的路径
        filename: 'bundle.js' //配置输出的文件名
    },
    module: {
        rules: [ //文件的匹配规则
            // loader的加载顺序是从右往左
            // use: 表示使用哪些loader模块来处理test索匹配到的文件

            // 处理css文件的规则
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }

            
            // images [当test匹配的文件只用一种loader 的时候,可以采用如下配置:]
            , {
                test: /\.(jpg|jpeg|gif|bmp|png)$/,
                loader: 'url-loader',
               
            }
            
            //fonts
            , {
                test: /\.(ttf|eot|svg|woff|woff2)$/,
                use: ['url-loader']
            }


            // 多个loader,并且每个loader的配置option不一样
            // ,{test:/\.css$/,use:[{loader:'style-loader',options:{}},{loader:'css-loader',options:{}}]}

            // ,{test:/\.css$/,use:[{loader:'style-loader'},{loader:'css.loader'}]} 等价于 {test:/\.css$/,use:['style-loader', 'css-loader']}

            // 使用babal 处理高级js语法 [安装babel的相关loader包]
            ,{
                test:/\.js$/,
                use:['babel-loader'],
                exclude: /node_modules/  //排除node_modules文件夹中的所有js文件不做转化处理,[否则打包速度很慢]
            }

            //在webpack 中配置.vue组件页面的解析
            ,{
                test:/\.vue$/,
                use:['vue-loader']
            }

            // 使用webpack 打包scss 文件
            ,{
                test:/\.scss$/,
                use:['style-loader','css-loader','sass-loader']
            }
        ]
        
       
    }

    // resolve []
    ,resolve:{
        alias:{
            "vue$":"vue/dist/vue.js"
        }
    }
    
     // plugins [插件]
     ,plugins:[
        new VueLoaderPlugin() //实例化VueLoaderPlugin 插件
    ]
}
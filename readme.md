## vue-cmsshop

### 配置文件
在 `main.js` 文件中 进行各种文件配置
 
 + 引入各种所需模块
    - vue	       : 用于定义全局的 Vue (需下载: npm i vue -S)
    - vue-resource : 用来发送ajax请求,解析后台开发文档中的 json数据 (需下载: npm i vue-resource -S)
    - vue-router   : 用于定义路由 (需下载: npm i vue-router -S)
    ```js
        import vueResource from 'vue-resource'; //用来发送ajax请求
        import vueRouter from 'vue-router';
        Vue.use(vueResource);
        Vue.use(vueRouter);
    ```
    - moment	   : 用于定义全局路由 (需下载: npm i moment -S)
    ```js
        import moment from 'moment';
        Vue.filter('dateFormat',(datastr,pattern = 'YYYY-MM-DD HH:mm:ss')=>{
            return moment(datastr).format(pattern);
        });
    ```
 + 引入各种所需组件
    mint-ui [ui组件][]  (需下载: npm i mint-ui -S)
    ```js
        import 'mint-ui/lib/style.css';
        import { Header,Swipe,SwipeItem,Button,Lazyload } from "mint-ui";
        Vue.component(Header.name,Header);
        Vue.component(Swipe.name,Swipe);
        Vue.component(SwipeItem.name,SwipeItem);
        Vue.component(Button.name,Button); //用于 [发布评论,加载更多] 的点击按钮控件
        Vue.use(Lazyload); //用于 [显示图片] 的懒加载
    ```
+ 引入样式 (扩展样式)
    ```js
        import './lib/mui/css/mui.css'; 
        import './lib/mui/css/icons-extra.css';
    ```
+ 引入 app.vue 文件
    ```js
        import app from './app.vue';
    ```

+ 导入自定义的路由模块 (router.js)
    ```js
        import router from './router.js';
    ```

### 自定义路由模块
    在 js文件 `router.js` 中引入路由模块 `vue-loader`, 所需路由组件,定义相对应的路由,最后暴露路自定义路由

    ```js
        import vueRouter from 'vue-router';
        import home from './components/tabbar/home.vue';
        const router = new vueRouter({ //创建路由对象
            routes: [
                    {path:'/',redirect:'/home'},
                    {path:'/home',component:home},
                    {path:'/home/newsDetail/:id',component:newsDetail},  //带id 的 newsDetail
                    {path:'/home/photoDetail/:id',component:photoDetail}  //带id 的 photoDetail
                ],
                
                // 修改路由对象的默认类
                'linkActiveClass':'mui-active'
        });
        export default router;
    ```

### 创建各种所需子组件

    如:home.vue文件, `./src/components/tabbar/home.vue`
        ```vue
            <template>
                <div>

                </div>
            </template>

            <script>
                export default {
                    
                }
            </script>

            <style scoped>

            </style>
        ```





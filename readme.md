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
    // 引入router模块
    import vueRouter from 'vue-router';

    // tabbar
    import home from './components/tabbar/home.vue';

    // news
    import newsList from './components/news/newsList.vue';
    import newsDetail from './components/news/newsDetail.vue';

    // 定义各种路由
    const router = new vueRouter({ //创建路由对象
        routes: [
            {path:'/',redirect:'/home'},
            {path:'/home',component:home},
            {path:'/home/newsList',component:newsList},
            {path:'/home/newsDetail/:id',component:newsDetail},  //带id 的 newsDetail
        ],
        
        // 修改路由对象的默认类
        'linkActiveClass':'mui-active'
    });

    // 进行暴露
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
### 缩略图界面

引入查看大图[可滑动]插件 -- vue-preview
```js
    import VuePreview from 'vue-preview';
    Vue.use(VuePreview);
```
在`photodetail.vue`子组件中定义
```vue
    <template>
     <!-- 缩略图  [vue-preview] - [可滑动 :slides] -->
        <vue-preview :slides='images'></vue-preview>

    </template>

    <script>
        getThumbImg(){
                this.$http.get('api/getthumbimages/'+this.id).then((res)=>{
                    console.log(res.body);

                    if(res.body.status == 0){
                        res.body.message.forEach(ele => {
                            console.log(ele);
                            ele.msrc=ele.src;
                            ele.w = 600;
                            ele.h = 400;
                        });
                    }
                    this.images = res.body.message;
                });
            }
    </script>

```


### 商品列表的弹性布局
`弹性布局` 一般用flex进行布局

```vue
    
    <template>
        <div>
            <router-link class="item" :to="'/home/goodsDetail/'+item.id" tag="div" v-for="item in goodslist" :key="item.id">
                <!-- 懒加载图片 -->
                <img v-lazy='item.img_url' alt="">
                <h3 class="title">{{item.title}}</h3>

                <!-- 商品信息 -->
                <div class="info">
                    <p class="price">
                         <span class="new">💴 {{item.sell_price}}</span>
                         <span class="origin">💴 {{item.market_price}}</span>
                    </p>
                    <p class="hot">
                        <span>热卖中</span>
                        <span class="lost">剩 <span class="num">{{ item.stock_quantity }}</span> 件</span>
                    </p>
                </div>
            </router-link>
        </div>
    </template>

    <script>
        export default {
            
        }
    </script>

    <style scoped>
        .item{

            width: 48%;
            border: 1px solid #ccc;
            margin-bottom: 5px;
            box-shadow: 0px 0px 5px #ccc;
            border-radius: 3px;
            padding: 4px;

            display: flex; // 垂直排列
            flex-direction: column; // 设置上下顶端和底部对齐
            justify-content: space-between;
        }
    </style>
```

### vue中按钮实现跳转

```vue
    <template>
        <div>
             <div class="mui-card-footer btn">
                <!-- plain 属性,是指按钮按下去时会有闪动效果 -->
                <mt-button plain type="primary" size='large'>评论</mt-button>
                <mt-button plain type="danger" size='large' @click="getGoodsDesc">商品详情</mt-button>
            </div>
        </div>
    </template>

    <script>
        export default {
            data() {
                return {
                    id: this.$route.params.id,
                    goodsinfo: {},
                    lunbo: []
                }
            },
            methods:{
                getGoodsDesc() {
                    this.$router.push('/home/goodsDesc/' + this.id);

                    // this.$route.params 是指查询的对象
                    // this.$router.push  是指跳转的对象
                }
            }
        }
    </script>

    <style scoped>

    </style>
```



### vuex  -- 用法

1. vuex 下载 `npm i vuex -S`

2. 在 `main.js` 文件中,进行导入,并安装到vue身上

   ```js
   import Vuex from 'vuex'
   Vue.use(Vuex);
   ```

3. 创建store 对象,实现组件间的数据共享

4. ```js
   var store = new Vuex.Store({
   	state:{},
   	mutations:{},
   	getters:{}
   });
   ```

   将store 挂载到vue实例身上

   ```js
   new Vue({
       store
   });
   ```

5. 有关仓库中state 数据的操作

   + 在mutations 的方法中最多只能有两个参数 [第一个为state,第二个为唯一参数]

6. ```js
   
   ```

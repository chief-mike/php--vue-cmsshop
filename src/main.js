// 1. 引入vue
import Vue from 'vue';


// 2. 引入模块 vue-resource,vue-router
import vueResource from 'vue-resource'; //用来发送ajax请求
import vueRouter from 'vue-router';
Vue.use(vueResource);
Vue.use(vueRouter);


// 7.设置全局属性
Vue.http.options.root = 'http://127.0.0.1:3000/'; //设置全局ajax请求的根域名


// 8.引入moment模块,用于定义全局过滤器
import moment from 'moment';
Vue.filter('dateFormat',(datastr,pattern = 'YYYY-MM-DD HH:mm:ss')=>{
    return moment(datastr).format(pattern);
});


// 3. 引入 mint-ui组件
import 'mint-ui/lib/style.css';
import { Header,Swipe,SwipeItem,Button,Lazyload } from "mint-ui";
Vue.component(Header.name,Header);
Vue.component(Swipe.name,Swipe);
Vue.component(SwipeItem.name,SwipeItem);
Vue.component(Button.name,Button); //用于 [发布评论,加载更多] 的点击按钮控件
Vue.use(Lazyload); //用于 [显示图片] 的懒加载


// 9.引入可滑动的标签页组件 - vant
import { Tab,Tabs } from "vant";
import 'vant/lib/index.css';  //按需导入所需样式
Vue.use(Tab).use(Tabs);


// 4. 引入样式 [扩展]
import './lib/mui/css/mui.css'; 
import './lib/mui/css/icons-extra.css';


// 5. 引入router.js 模块
import router from './router.js';


// 6. 引入app.vue文件
import app from './app.vue';

new Vue({
    el:'#app',
    render: c=>c(app),
    router
    
});
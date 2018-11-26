// 引入router模块
import vueRouter from 'vue-router';

// 引入路由对应的组件
// tabbar
import home from './components/tabbar/home.vue';
import member from './components/tabbar/member.vue';
import shopCar from './components/tabbar/shopCar.vue';
import search from './components/tabbar/search.vue';

// news
import newsList from './components/news/newsList.vue';
import newsDetail from './components/news/newsDetail.vue';

// photo
import photoList from './components/photo/photoList.vue';
import photoDetail from './components/photo/photoDetail.vue';


// 定义各种路由
const router = new vueRouter({ //创建路由对象
    routes: [
        {path:'/',redirect:'/home'},
        {path:'/home',component:home},
        {path:'/member',component:member},
        {path:'/shopCar',component:shopCar},
        {path:'/search',component:search},
        {path:'/home/newsList',component:newsList},
        {path:'/home/newsDetail/:id',component:newsDetail},  //带id 的 newsDetail
        {path:'/home/photoList',component:photoList},
        {path:'/home/photoDetail/:id',component:photoDetail}  //带id 的 photoDetail
    ],
    
    // 修改路由对象的默认类
    'linkActiveClass':'mui-active'
});

// 进行暴露
export default router;
<template>
    <div class="home-container">
        <!-- 轮播图 -->
        <!-- <mt-swipe :auto="4000">
            <mt-swipe-item>111</mt-swipe-item>
            <mt-swipe-item>222</mt-swipe-item>
            <mt-swipe-item>333</mt-swipe-item>
        </mt-swipe> -->
        <swipe :lunbo="lunbo"></swipe>
        <!-- <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in lunbo" :key="item.url">
                <img :src="item.img" alt="">
            </mt-swipe-item>
        </mt-swipe> -->

        <!-- 九宫格 -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newsList">
                    <img src="../../images/menu1.png" alt="">
                    <div class="mui-media-body">新闻资讯</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/photoList" >
                    <img src="../../images/menu2.png" alt="">
                    <div class="mui-media-body">图片分享</div>
                </router-link >
            </li>

            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/home/goodsList">
                        <img src="../../images/menu3.png" alt="">
                        <div class="mui-media-body">商品购买</div>
                    </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../images/menu4.png" alt="">
                    <div class="mui-media-body">留言反馈</div>
                </a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../images/menu5.png" alt="">
                    <div class="mui-media-body">视频专区</div>
                </a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../images/menu6.png" alt="">
                    <div class="mui-media-body">联系我们</div>
                </a></li>

        </ul>
    </div>
</template>

<script>
    // 引入公共的swipe子组件
    import swipe from '../common/swipe.vue';

    export default {
        data() {
            return {
                lunbo: []
            }
        },
        created() {
            //此生命周期函数，会在当前组件实例等待data和methods属性准备好之后才会执行此函数
            this.getLunbo();
        },
        methods: {
            getLunbo() {
                this.$http.get('api/getlunbo').then(function (res) {
                    console.log(res);
                    if (res.body.status == 0) {
                        this.lunbo = res.body.message;
                    }
                });
            }
        },
        components:{
            swipe
        }
    }
</script>

<style lang='scss' scoped>
    .home-container {
        // .mint-swipe {
        //     height: 200px;
        //     img {
        //         width: 100%;
        //         height: 100%;
        //     }
        // }

        .mui-grid-9 {
            background-color: #fff;

            .mui-table-view-cell {
                border: none;

                .mui-media-body {
                    font-size: 13px;
                }

                img {
                    width: 50%;
                }
            }
        }
    }
</style>

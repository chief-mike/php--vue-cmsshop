<template>
    <div class="goodslist-container">
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

            <!-- 加载更多 -->
            <mt-button type="danger" size="large" plain @click="loadMore">加载更多</mt-button>
       
    </div>
</template>

<script>
    export default {
        data(){
            return {
                pageindex:1,
                goodslist : []
            }
        },
        created() {
            this.getGoodsList();
        },
        methods:{
            getGoodsList(){
                this.$http.get('api/getgoods?pageindex='+this.pageindex).then((res)=>{

                    if(res.body.status == 0){
                        this.goodslist = this.goodslist.concat(res.body.message); //防止将原有的数据覆盖
                    }
                });
            },
            loadMore(){
                this.pageindex++;  //页码自增
                this.getGoodsList();
            }
        }
    }
</script>

<style lang='scss' scoped>
    .goodslist-container{

        display: flex;  //弹性布局
        flex-wrap: wrap; //换行 [第一行在上面]
        flex-direction: row; //排列方向
        justify-content: space-between; //两端对齐

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

            .title {
                font-size: 15px;
            }

            .info{
                margin: 0px;
                background-color: #ccc;
                padding: 3px 5px;

                .price{
                    .new{
                        color: red;
                        font-weight: bolder;
                    }
                    .origin{
                        font-size: 12px;
                        text-decoration: line-through;
                    }
                }

                .hot{
                    .lost{
                        color: chocolate;
                        float: right;

                        .num{
                            font-size: 16px;
                        }
                    }
                }
            }
        }

        img{
            width: 100%;
        }
        
    }
</style>
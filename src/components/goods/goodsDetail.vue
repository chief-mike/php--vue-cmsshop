<template>
    <div class="goodsdetail-container">
        <!--  -->
         <div class="mui-card">
            <!-- <div class="mui-card-header">页眉</div> -->
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <!-- 包含页眉页脚的卡片，页眉常用来显示面板标题，页脚用来显示额外信息或支持的操作（比如点赞、评论等） -->
                    <swipe :lunbo="lunbo"></swipe>
                </div>
            </div>
            <!-- <div class="mui-card-footer">页脚</div> -->
        </div>

        <!-- 卡片: 商品购买区域 -->
        
        <div class="mui-card">
				<div class="mui-card-header">{{goodsinfo.title}}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
                        <p>
                            <span class="new">{{goodsinfo.sell_price}}</span>
                            <span class="origin">{{goodsinfo.market_price}}</span>
                        </p>
                        <div>
                            <span class="number">购买数量： </span>
                            <div class="mui-numbox" data-numbox-min='1' data-numbox-max='200'>
                            <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
                            <input id="test" class="mui-input-numbox" type="number" value="1" />
                            <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
                            </div>  
                        </div>

					</div>
				</div>
				<div class="mui-card-footer">
                    <mt-button type='primary' class="buy">加入购物车</mt-button>
                    <mt-button type="danger">购买商品</mt-button>
                </div>
			</div>

        <!-- 卡片: 商品参数区域 -->
        <div class="mui-card">
				<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
                        <p>
                            商品编号: {{goodsinfo.goods_no}}
                        </p>
                        <p>
                            商品库存: {{goodsinfo.stock_quantity}}
                        </p>
                        <p>
                            添加时间: {{goodsinfo.add_time | dateFormat}}
                        </p>
					</div>
				</div>
				<div class="mui-card-footer btn">
                    <mt-button type="primary" size='large'>评论</mt-button>
                    <mt-button type="danger" size='large' @click="getGoodsDesc">商品详情</mt-button>
                </div>
        </div>
    </div>
</template>
 
<script>
    // 导入轮播图组件
    import swipe from '../common/swipe.vue';

    // 引入 mui的 js文件
    import mui from '../../lib/mui/js/mui.js';

    export default {
        data(){
            return {
                id:this.$route.params.id,
                goodsinfo:{},
                lunbo:[]
            }
        },
        components:{
            swipe
        },
        created() {
            this.getGoodsInfo();
            this.getThumbImg();
        },
        mounted() {  //该生命周期可以操作js
            // mui('.mui-numbox').numbox();
             mui('.mui-numbox').numbox(); 
        },
        methods:{
            getGoodsInfo(){
                this.$http.get('api/getgoodsinfo/'+this.id).then((res)=>{
                    this.goodsinfo = res.body.message[0];
                });
            },
            getThumbImg(){
                   this.$http.get('api/getthumbimages/'+this.id).then((res)=>{
                    console.log(res.body);
                    if(res.body.status == 0){

                        if(res.body.message.length == 0){
                                // 自定义资源
                                 //设置默认图片,追加一个对象
                                res.body.message.push({
                                img: "http://phvbk3pna.bkt.clouddn.com/huawei.png",
                                url: "http://phvbk3pna.bkt.clouddn.com/huawei.png",
                                });
                        }else{

                            res.body.message.forEach(ele => {
                                console.log(ele);
                                ele.img=ele.src;
                                ele.url=ele.src;
                                // ele.w = 600;
                                // ele.h = 400;
                            });
                        }
                    }
                    this.lunbo = res.body.message;
                });
            },
            getGoodsDesc(){
                // 重定向 -- goodsDesc
                this.$router.push('/home/goodsDesc/'+this.id);
            }
        }
    }
</script>

<style lang='scss' scoped>
    .goodsdetail-container{


        .mui-card{

            p{
                font-size: 15px;
            }

            .buy{

            }

            .btn{
                display: flex; // 垂直排列
                flex-direction: column; // 设置上下顶端和底部对齐
                justify-content: space-between;
            }
        }
    }
</style>
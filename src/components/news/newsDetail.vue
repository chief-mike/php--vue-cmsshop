<template>
    <div class="newsdetail-container">
        <!-- 大标题 -->
        <h3 class="title">{{news.title}}</h3>

        <!-- 子标题 -->
        <div class="subtitle">
            <span>发布时间: {{news.add_time | dateFormat}}</span>
            <span class="click">点击 {{news.click}} 次</span>
        </div>

        <!-- 华丽的分割线 -->
        <hr>

        <!-- 内容 -->
        <div class="content" v-html="news.content">
            <!-- v-html与 v-text的区别: v-text 输出的是纯文本,不会解析内容,二 v-html 会将内容当成html进行解析 -->
        </div>

        <!-- 评论,引入公共的评论子组件 -->
                <!-- 绑定id -->
        <comment :id="id"></comment> 
    </div>
</template>

<script>
    // 引入common.vue文件
    import comment from '../common/comment.vue';

    export default {
        data() {
            return {
                id: this.$route.params.id,
                news: {} //单个集合的对象
            }
        },
        created() {
            this.getnews();
        },
        methods: {
            getnews() {
                this.$http.get('api/getnew/' + this.id).then((res) => {
                    console.log(res);
                    if (res.body.status == 0) {
                        this.news = res.body.message[0]; // [{}]
                    }
                });
            }
        },

        // 加载子组件 [公共评论组件]
        components:{
            comment
        }
    }
</script>

<style lang='scss' scoped>
    .newsdetail-container {
        padding: 0 10px;

        .title {
            padding: 10px 0;
            font-size: 16px;
            color: #000;
            text-align: center;
        }

        .subtitle {
            font-size: 13px;
            color: cornflowerblue;

            .click{
                float: right;   
            }
        }

        .content{
            width: 100%
        }

    }
</style>
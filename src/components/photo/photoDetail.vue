<template>
    <div class="photo-container">
        <!-- photoinfo -->
        <h2 class="title">{{photoinfo.title}}</h2>

        <!-- 子标题 -->
        <p class="subtitle">
            <span>发表时间: {{photoinfo.add_time | dateFormat}}</span>
            <span class="click">点击: {{photoinfo.click}}次</span>
        </p>

        <!-- 华丽的分割线 -->
        <hr>

        <!-- 图片信息 -->
        <div class="images">
            <img src="http://phvbk3pna.bkt.clouddn.com/zhongri.jpg" alt="">
        </div>

        <!-- 内容 -->
        <div class="content" v-html="photoinfo.content"></div>

        <!-- 评论组件 -->
        <comment :id="id"></comment>
    </div>
</template>

<script>
    // 引入评论组件 -- comment
    import comment from '../common/comment.vue';

    export default {
        data() {
            return {
                id: this.$route.params.id,
                photoinfo: {}
            }
        },
        created() {
            this.getImageInfo();
        },
        methods: {
            getImageInfo() {
                this.$http.get('api/getimageInfo/' + this.id).then((res) => {
                    if (res.body.status == 0) {
                        this.photoinfo = res.body.message[0];
                    }
                });
            }
        },
        components: {
            comment
        }

    }
</script>

<style lang='scss' scoped>
    .photo-container{
        padding: 5px 5px;
        .title{
            text-align: center;
            color: darkslateblue;
            font-size: 15px;
            padding: 5px 5px;
        }

        .subtitle{
            color: #ccc;

            .click{
                float: right;
            }
        }

        .images img{
            padding: 5px;
            width: 100%;    
        }

        .content{
            line-height: 30px;
            font-size: 13px;
        }
    }
</style>
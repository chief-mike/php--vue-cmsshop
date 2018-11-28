<template>
    <div class="goodsdesc-container">
        <h2 class="title"> {{goodsinfo.title}} </h2>

        <!-- 华丽的分割线 -->
        <hr>

        <!-- 内容 -->
        <div class="content" v-html="goodsinfo.content"></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                id: this.$route.params.id,
                goodsinfo: {}
            }
        },
        created() {
            this.getGoodsDesc();
        },
        methods: {
            getGoodsDesc() {
                this.$http.get('api/getgoodsdesc/' + this.id).then((res) => {
                    if (res.body.status == 0) {
                        this.goodsinfo = res.body.message[0];
                    }
                });
            }
        }
    }
</script>

<style lang='scss' scoped>
    .goodsdesc-container {
        .title {
            font-size: 15px;
        }

        .content {
            color: #ccc;
        }

        /deep/ img {
            width: 100%;
            height: 100%;
        }
    }
</style>

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
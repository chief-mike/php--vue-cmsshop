<template>
    <div class="comment">
        <h2 class="title">发表评论</h2>
        <!-- 吐槽 -->
        <textarea placeholder="请吐槽..." v-model="content"></textarea>
        <!-- 发布评论 -->
        <mt-button type='primary' size='large' @click="postcomment">发布评论</mt-button>
        <!-- 显示评论 -->
        <div class="list">
            <!-- 将index 作为 key的值 -->
            <div class="list-item" v-for="(item,index) in comments" :key="index">
                <div class="client">第{{index+1}}楼: {{item.user_name}} 发表时间:{{item.add_time | dateFormat}}</div>
                <div class="content">{{item.content}}</div>
            </div>
            <!-- 加载更多 -->
            <mt-button type='danger' plain size='large' @click="loadmore">加载更多</mt-button>
        </div>
    </div>
</template>

<script>
    // 引入弹出控件 Toast
    import {
        Toast
    } from "mint-ui";

    export default {
        data() {
            return {
                content: '',
                pageindex: 1, //默认当前页为第一页
                comments: [] //设置集合点
            }
        },
        props: ['id'], //接受父传递过来的id值
        created() {
            this.getcomments();
        },
        methods: {
            getcomments() { //获取并显示评论
                this.$http.get('api/getcomments/' + this.id + '?pageindex' + this.pageindex).then((res) => {
                    if (res.body.status == 0) {
                        if (res.body.message.length == 0) { //即没有内容了
                            Toast('没了,都给你了');
                        }

                        // 否则将原有的内容连接起来 [和新来的]  --  [不能将原有的数据进行覆盖]
                        this.comments = this.comments.concat(res.body.message);
                    }
                });
            },
            postcomment() { //发布评论
                if (this.content.trim() == '') { //即输入的评论内容为空,则打回
                    Toast('评论为空...');
                    return;
                }

                // [第一个参数携带上发送评论的id,第二是参数时要发送的内容,第三个参数时标注为json 格式]
                this.$http.get('api/postcomment/' + this.id, {
                    content: this.content
                }, {
                    emulateJSON: true
                }).then( (res) => {
                    if (res.body.status == 0) {
                        Toast('已评论~');
                        this.content = ''; //发送成功后,清空文本输入框,
                        this.comments = []; //清空集合点的数据  ? [为了避免脏数据依然存在,后期会将数据库中的所有评论显示,不必担忧],
                        this.getcomments(); // 重新加载显示所有的评论
                    }
                });
            },
            loadmore() { //点击加载更多
                this.pageindex++; //翻页
                this.getcomments(); //加载显示评论
            }

        }
    }
</script>

<style lang='scss' scoped>
    .comment {
        width: 100%;

        .title {
            font-size: 18px;
        }

        .list {
            padding: 5px 0;

            .list-item {
                padding: 5px 1px;

                .client {
                    font-size: 12px;
                    background-color: #fff;
                }
            }
        }
    }
</style>
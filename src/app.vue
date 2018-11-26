<template>
    <div class="app_container">
        <!-- header头部分 -->
        <!-- fixed 即将header的位置进行固定 -->
        <mt-header fixed title="chief-vue-shop"></mt-header>

         <!-- 对应tabbar匹配的主体内容 中间部分-->
         <router-view></router-view> 

        <!-- tabbar选项卡 -->
        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item" to="/home">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item" to="/member">
                <span class="mui-icon mui-icon-contact"></span>
                <span class="mui-tab-label">会员</span>
            </router-link>
            <router-link class="mui-tab-item" to="/shopcar">
                <!-- 从扩展文件中寻找资源 -->
                <span class="mui-icon mui-icon-extra mui-icon-extra-cart"> <span class="mui-badge">0</span> </span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item" to="/search">
                <span class="mui-icon mui-icon-search"></span>
                <span class="mui-tab-label">搜索</span>
            </router-link>
        </nav>

    </div>
</template>

<script>
    export default {

    }
</script>

<style lang='scss' scoped>
    // lang='scss' 便于css样式进行嵌套
    .app_container {
        padding-top: 40px;
        padding-bottom: 50px;
    }
</style>
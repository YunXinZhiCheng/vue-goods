<template>
  <div>
    <NavBar>
      <!-- 为插槽添加内容 -->
      <template v-slot:default>商品详情: {{ id }}</template>
    </NavBar>
    <!-- 图片组件+图片懒加载 -->
    <van-image
      style="margin-top: 50px;"
      width="100%"
      lazy-load
      :src="detail.cover_url"
    />

    <!-- 商品卡片组件:自定义 -->
    <van-card
      style="text-align: left;"
      :num="detail.stock"
      :price="detail.price + '.00'"
      :desc="detail.description"
      :title="detail.title"
    >
      <!-- 标签 -->
      <template #tags>
        <van-tag plain type="danger">新书</van-tag>
        <van-tag plain type="danger">推荐</van-tag>
      </template>
      <!-- 按钮 -->
      <template #footer>
        <van-button type="warning">加入购物车</van-button>
        <van-button type="danger">立即购买</van-button>
      </template>
    </van-card>

    <!-- 标签页组件：可切换 -->
    <van-tabs v-model:active="active">
      <van-tab title="概述">
        <!-- v-html 插值方式解析html内容 -->
        <div class="content" v-html="detail.details"></div>
      </van-tab>
      <van-tab title="热评">
        <!-- 待开发功能 -->
      </van-tab>
      <van-tab title="相关图书">
        <!-- 图书列表组件: 父传子 -->
        <GoodsList :goods="like_goods" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
import GoodsList from '@/components/content/goods/GoodsList'

import { onMounted, ref, reactive, toRefs } from 'vue'
// 导入路由
import { useRoute } from 'vue-router'
// 导入详情接口函数
import { getDetail } from '@/network/detail.js'

export default {
  // 商品详情页面
  name: 'Detail',
  components: {
    NavBar,
    GoodsList,
  },
  setup() {
    const route = useRoute()
    let id = ref(0)
    let active = ref(0)

    // 模型数据
    let book = reactive({
      detail: {}, // 概述
      like_goods: [], // 相关图书
      comments: [], // 热评
    })

    // 网络请求
    onMounted(() => {
      id.value = route.query.id
      // 商品详情数据
      getDetail(id.value).then((res) => {
        console.log(res)

        book.detail = res.goods // 概述
        book.like_goods = res.like_goods // 相关图书
        book.comments = res.goods.comments // 热评
        console.log(res.goods.comments)
      })
    })
    return {
      id,
      ...toRefs(book),
      active,
    }
  },
}
</script>

<style lang="less" scoped>
// 图书内容的样式
.content {
  padding: 10px;
  // 图片响应式
  img {
    max-width: 100%;
    height: auto;
  }
}
</style>

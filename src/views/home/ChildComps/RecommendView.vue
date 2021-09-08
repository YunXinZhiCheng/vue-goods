<template>
  <!-- 推荐商品 -->
  <div class="recommend">
    <!-- 推荐商品项：
        数组方法：可以选取4个slice(0,4)
    -->
    <div
      class="recommend-item"
      v-for="item in recommends.slice(0, 4)"
      :key="item.id"
    >
      <a href="" @click.prevent="goD(item.id)">
        <!-- 图片懒加载 -->
        <img v-lazy="item.cover_url" alt="" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
// 导入路由
import { useRouter } from 'vue-router'

export default {
  name: 'RecommendView',
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      },
    },
  },
  setup() {
    const router = useRouter()
    // 路由跳转函数
    const goD = (id) => {
      // 跳转到商品详情页面
      router.push({
        path: '/detail',
        query: { id },
      })
    }
    return {
      goD,
    }
  },
}
</script>

<style lang="less" scoped>
.recommend {
  display: flex;
  width: 100%;
  text-align: center;
  padding: 15px 0 30px;
  border-bottom: 8px solid #eee;
  font-size: 12px;
  .recommend-item {
    flex: 1;
    img {
      width: 70px;
      height: 70px;
      margin-bottom: 10px;
    }
  }
}
</style>

<template>
  <div class="goods">
    <GoodsListItem v-for="item in goods" :key="item.id" :product="item" />
  </div>
</template>

<script>
import GoodsListItem from '@/components/content/goods/GoodsListItem'
export default {
  // 商品列表组件
  name: 'GoodsList',
  components: {
    GoodsListItem,
  },
  props: {
    goods: {
      type: Array,
      default() {
        return []
      },
    },
  },
}
</script>

<style lang="less" scoped>
// 商品列表的样式
.goods {
  // 弹性布局：换行与四周环绕
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 5px;
}
</style>

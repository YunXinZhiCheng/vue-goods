<template>
  <div class="goods-item" @click="itemClick">
    <!-- 商品图片: 图片懒加载-->
    <img v-lazy="product.cover_url" alt="" />

    <!-- 商品信息：标题+价格+收藏 -->
    <div class="goods-info">
      <p>{{ product.title }}</p>
      <span class="price">
        <small>￥</small>
        {{ product.price }}
      </span>
      <span class="collect">收藏:{{ product.collects_count }}</span>
    </div>
  </div>
</template>

<script>
// 导入路由
import { useRouter } from 'vue-router'
export default {
  // 商品列表项组件
  name: 'GoodsListItem',
  // 接收商品属性
  props: {
    product: Object,
    default() {
      return {}
    },
  },
  setup(props) {
    const router = useRouter()

    return {
      itemClick: () => {
        router.push({ path: '/detail', query: { id: props.product.id } })
      },
    }
  },
}
</script>

<style lang="less" scoped>
// 商品列表项的样式
.goods-item {
  width: 46%;
  padding-bottom: 40px;
  // 定位
  position: relative;

  // 图片
  img {
    width: 100%;
    border-radius: 5px;
  }
  // 信息
  .goods-info {
    font-size: 12px;
    // 底部居中
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    // 文本溢出
    overflow: hidden;
    text-align: center;
    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: 3px;
    }

    .price {
      color: red;
      margin-right: 20px;
    }
     .collect {
      position: relative;
    }
    .collect::before {
      content: '';
      position: absolute;
      left: -15px;
      width: 14px;
      height: 14px;
      top: -1px;
      background: url('~assets/images/collect.png') 0 0/14px 14px;
    }
  }
}
</style>

<template>
  <van-swipe
    v-if="banners.length"
    class="my-swipe"
    :autoplay="3000"
    indicator-color="white"
  >
    <van-swipe-item v-for="(item, index) in banners.slice(0, 5)" :key="index">
      <img :src="item.img_url" alt="" />
    </van-swipe-item>
  </van-swipe>
</template>

<script>
export default {
  // 首页组件
  name: 'HomeSwiper',
  props: {
    banners: {
      type: Array,
      default() {
        return []
      },
    },
  },
}
</script>

<style lang="less" scoped>
// 轮播图组件的样式
// .my-swipe .van-swipe-item {
//     color: #fff;
//     font-size: 20px;
//     line-height: 150px;
//     text-align: center;
//     background-color: #39a9ed;
//   }
img {
  width: 100%;
  height: auto !important;
}
</style>

<template>
  <div>
    <!-- 标题栏 -->
    <NavBar>
      <!-- 为插槽添加内容 -->
      <template v-slot:default>图书兄弟</template>
    </NavBar>

    <!-- 轮播图 -->
    <div class="banners">
      <img src="@/assets/images/1.png" alt="" />
    </div>

    <!-- 推荐商品：子组件
         父传子：
     -->
    <RecommendView :recommends="recommends" />
  </div>
</template>

<script>
// 引入组件
import NavBar from '@/components/common/navbar/NavBar'
import RecommendView from '@/views/home/ChildComps/RecommendView'
import { ref, onMounted, toRefs } from 'vue'

//引入首页接口函数
import { getHomeAllData } from '@/network/home.js'
export default {
  name: 'Home',
  components: {
    NavBar,
    RecommendView,
  },
  setup() {
    // 轮播图数据
    const banner = ref([])
    // 推荐商品数据
    const recommends = ref([])

    // 生命周期：异步获取网络请求
    onMounted(() => {
      getHomeAllData()
        .then((res) => {
          console.log(res)
          banner.value = res.slides
          recommends.value = res.goods.data
        })
        .catch((err) => {
          console.log(err)
        })
    })
    return {
      banner,
      recommends,
    }
  },
}
</script>

<style scoped>
/* 轮播图的样式 */
.banners img {
  width: 100%;
  height: auto;
  margin-top: 45px;
}
</style>

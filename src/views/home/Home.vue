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
         父传子：传递推荐
     -->
    <RecommendView :recommends="recommends" />

    <!-- 选项卡：子组件
        父传子:传递一个数组
        子传父:@自定义事件
     -->
    <TabControl :titles="['畅销', '新书', '精选']" @tabClick="tabClick" />

    <!-- 商品列表：子组件
         父传子：传递当前显示商品
     -->
    <GoodsList :goods="showGoods" />
  </div>
</template>

<script>
// 引入组件
import NavBar from '@/components/common/navbar/NavBar'
import RecommendView from '@/views/home/ChildComps/RecommendView'
import TabControl from '@/components/content/tabControl/TabControl'
import GoodsList from '@/components/content/goods/GoodsList'
import { ref, onMounted, reactive, computed } from 'vue'

//引入首页接口函数
import { getHomeAllData, getHomeGoods } from '@/network/home.js'
export default {
  // 首页组件
  name: 'Home',
  components: {
    NavBar,
    RecommendView,
    TabControl,
    GoodsList,
  },
  setup() {
    // 轮播图数据
    const banner = ref([])
    // 推荐商品数据
    const recommends = ref([])

    // 商品列表数据模型：reactive
    const goods = reactive({
      sales: { page: 0, list: [] },
      new: { page: 0, list: [] },
      recommend: { page: 0, list: [] },
    })

    // 当前类型
    let currentType = ref('sales')

    // 显示当前商品：计算属性
    const showGoods = computed(() => {
      return goods[currentType.value].list
    })

    // 生命周期：异步获取网络请求
    onMounted(() => {
      // 首页数据
      getHomeAllData().then((res) => {
        // console.log(res)
        banner.value = res.slides
        recommends.value = res.goods.data
      })

      // 商品列表数据：畅销
      getHomeGoods('sales').then((res) => {
        goods.sales.list = res.goods.data
      })
      // 商品新品数据：新书
      getHomeGoods('new')
        .then((res) => {
          goods.new.list = res.goods.data
        })
        .catch((err) => {
          console.log(err)
        })
      // 商品推荐数据：精选
      getHomeGoods('recommend').then((res) => {
        goods.recommend.list = res.goods.data
      })

      // console.log(goods)
    })

    // 自定义事件
    const tabClick = (index) => {
      // 选择类型
      let types = ['sales', 'new', 'recommend']
      currentType.value = types[index]
    }

    return {
      banner,
      recommends,
      tabClick,
      showGoods,
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

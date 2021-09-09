<template>
  <div id="home">
    <!-- 标题栏 -->
    <NavBar>
      <!-- 为插槽添加内容 -->
      <template v-slot:default>图书兄弟</template>
    </NavBar>

    <TabControl
      v-show="isTabFixed"
      @tabClick="tabClick"
      :titles="['畅销', '新书', '精选']"
    ></TabControl>

    <!-- 滚动条: 外层容器>里层内容 -->
    <div class="wrapper">
      <div class="content">
        <!-- 轮播图 -->
        <div class="banref">
          <HomeSwiper :banners="banners"  style="margin-top:45px;"/>
        </div>

        <!-- 推荐商品：子组件 父传子：传递推荐 -->
        <RecommendView :recommends="recommends" />

        <!-- 选项卡：子组件 父传子:传递一个数组 子传父:@自定义事件 -->
        <TabControl :titles="['畅销', '新书', '精选']" @tabClick="tabClick" />

        <!-- 商品列表：子组件 父传子：传递当前显示商品 -->
        <GoodsList :goods="showGoods" />
      </div>
    </div>

    <!-- 回到顶部：子组件: 自定义事件 控制显示隐藏-->
    <BackTop @bTop="bTop" v-show="isShowBackTop" />
  </div>
</template>

<script>
// 引入组件
import NavBar from '@/components/common/navbar/NavBar'
import RecommendView from '@/views/home/ChildComps/RecommendView'
import TabControl from '@/components/content/tabControl/TabControl'
import GoodsList from '@/components/content/goods/GoodsList'
import BackTop from '@/components/common/backtop/BackTop'
import HomeSwiper from '@/views/home/ChildComps/HomeSwiper'

// 引入Vue相关
import { ref, onMounted, reactive, computed, watchEffect, nextTick } from 'vue'

// 引入滚动条插件
import BScroll from 'better-scroll'

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
    BackTop,
    HomeSwiper,
  },
  setup() {
    let isTabFixed = ref(false)
    let isShowBackTop = ref(false)
    let banref = ref(null)
    const recommends = ref([])

    // 商品列表数据模型
    const goods = reactive({
      sales: { page: 1, list: [] },
      new: { page: 1, list: [] },
      recommend: { page: 1, list: [] },
    })
    // 当前类型
    let currentType = ref('sales')

    // 商品显示
    const showGoods = computed(() => {
      return goods[currentType.value].list
    })
    // 滚动
    let bscroll = reactive({})
    // 轮播图
    let banners = ref([])

    // 网络请求
    onMounted(() => {
      // 首页所有数据
      getHomeAllData().then((res) => {
        recommends.value = res.goods.data
        banners.value = res.slides
        console.log(res.slides);
      })
      // 首页商品列表-畅销
      getHomeGoods('sales').then((res) => {
        goods.sales.list = res.goods.data
      })

      // 首页商品列表-新书
      getHomeGoods('new').then((res) => {
        goods.new.list = res.goods.data.slice(0,1)
      })

      // 首页商品列表-精选
      getHomeGoods('recommend').then((res) => {
        goods.recommend.list = res.goods.data
      })

      // 创建BetterScroll对象
      bscroll = new BScroll(document.querySelector('.wrapper'), {
        probeType: 3, // 0, 1, 2, 3, 3 只要在运运就触发scroll事件
        click: true, // 是否允许点击
        pullUpLoad: true, //上拉加载更多， 默认是false
      })

      //触发滚动事件
      bscroll.on('scroll', (position) => {
        // console.log(banref.value.offsetHeight)
        // console.log(-position.y)
        // isShowBackTop.value = isTabFixed.value =
        //   -position.y > banref.value.offsetHeight
      })

      // 上拉加载数据,触发pullingUp
      bscroll.on('pullingUp', () => {
        console.log('上拉加载更多.....')

        const page = goods[currentType.value].page + 1

        getHomeGoods(currentType.value, page).then((res) => {
          goods[currentType.value].list.push(...res.goods.data)
          goods[currentType.value].page += 1
        })

        // 完成上拉， 等数据请求完成， 要将新数据展示出来
        bscroll.finishPullUp()

        //重新计算高度
        bscroll.refresh()
        console.log(
          'contentheight:' + document.querySelector('.content').clientHeight
        )
        console.log('当前类型:' + currentType.value + ',当前页：' + page)
      })
    })
    // 商品选项卡类型
    const tabClick = (index) => {
      let types = ['sales', 'new', 'recommend']

      currentType.value = types[index]

      nextTick(() => {
        // 重新计算高度
        bscroll && bscroll.refresh()
      })
    }

    // 监听 任何一个变量有变量
    watchEffect(() => {
      nextTick(() => {
        // 重新计算高度
        bscroll && bscroll.refresh()
      })
    })

    // 自定义事件：回到顶部
    const bTop = () => {
      bscroll.scrollTo(0, 0, 500)
    }

    return {
      recommends,
      tabClick,
      goods,
      showGoods,
      isTabFixed,
      isShowBackTop,
      banref,
      bTop,
      banners,
    }
  },
}
</script>

<style scoped>
/* 全局样式 */
#home {
  height: 100vh;
  position: relative;
}

/* 轮播图的样式 */
.banners img {
  width: 100%;
  height: auto;
  margin-top: 45px;
}

/* 滚动条的样式 */
.wrapper {
  position: absolute;
  top: 45px;
  bottom: 50px;
  left: 0px;
  right: 0px;
  overflow: hidden;
  /* background: red; */
}
.content {
}
</style>

<template>
  <div>
    <NavBar>
      <!-- 为插槽添加内容 -->
      <template v-slot:default>商品分类</template>
    </NavBar>
    <div id="mainbox">
      <!-- 顶部排序项 -->
      <div class="ordertab">
        <!-- 标签页组件 -->
        <van-tabs v-model:active="active" @click="tabClick">
          <van-tab title="销量排序"></van-tab>
          <van-tab title="价格排序"></van-tab>
          <van-tab title="评论排序"></van-tab>
        </van-tabs>
      </div>

      <!-- 左边菜单导航: 侧边导航+折叠 -->
      <!-- 侧边导航组件 -->
      <van-sidebar class="leftmenu" v-model="activeKey">
        <!-- 折叠面板组件 -->
        <van-collapse v-model="activeNames">
          <van-collapse-item
            v-for="item in categories.slice(0, 5)"
            :key="item.id"
            :title="item.name"
            :name="item.name"
          >
            <van-sidebar-item
              v-for="sub in item.children"
              :key="sub.id"
              :title="sub.name"
              @click="getGoods(sub.id)"
            />
          </van-collapse-item>
        </van-collapse>
      </van-sidebar>

      <!-- 右边商品列表 -->
      <div class="goodslist">
        <div class="content">
          <!-- 商品卡片组件 -->
          <van-card
            v-for="item in showGoods"
            :key="item.id"
            :num="item.comments_count"
            :tag="item.comments_count >= 0 ? '流行' : '标签'"
            :price="item.price"
            :desc="item.updated_at"
            :title="item.title"
            :thumb="item.cover_url"
            :lazy-load="true"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
import { computed, onMounted, ref, reactive } from 'vue'
// 引入分类接口函数
import { getCategory, getCategoryGoods } from '@/network/category.js'
export default {
  // 商品分类组件
  name: 'Category',
  components: {
    NavBar,
  },
  setup() {
    let active = ref(0) // 当前激活标签索引值
    let activeKey = ref(0) // 当前选中项的索引：0
    let activeNames = ref(['1']) // 面板数组格式
    let categories = ref([]) // 分类数据默认：[]

    let currentOrder = ref(['sales']) // 当前排序的条件默认：销量
    let currentCid = ref(0) // 当前的分类id

    // 数据模型
    const goods = reactive({
      sales: {
        page: 1,
        list: [],
      },
      price: {
        page: 1,
        list: [],
      },
      comments_count: {
        page: 1,
        list: [],
      },
    })

    // 排序选项卡
    const tabClick = (index) => {
      let orders = ['sales', 'price', 'comments_count'] // 排序的数组

      currentOrder.value = orders[index] // 当前排序

      getCategoryGoods(currentOrder.value, currentCid.value).then((res) => {
        goods[currentOrder.value].list = res.goods.data
      })
      console.log('当前分类的id:' + currentCid.value)
      console.log('排序的序号:' + currentOrder.value)
    }
    // 通过分类得到商品
    const getGoods = (cid) => {
      currentCid.value = cid
      init()
      console.log('当前分类的id:' + currentCid.value)
      console.log('排序的序号:' + currentOrder.value)
    }
    // 通过计算属性显示商品
    const showGoods = computed(() => {
      return goods[currentOrder.value].list
    })

    // 初始化方法
    const init = () => {
      getCategoryGoods('sales', currentCid.value).then((res) => {
        goods.sales.list = res.goods.data
      })

      getCategoryGoods('price', currentCid.value).then((res) => {
        goods.price.list = res.goods.data
      })

      getCategoryGoods('comments_count', currentCid.value).then((res) => {
        goods.comments_count.list = res.goods.data
      })
    }

    // 网络请求
    onMounted(() => {
      // 商品分类
      getCategory().then((res) => {
        console.log(res)
        categories.value = res.categories
      })
      // 商品初始化
      init()
    })

    return {
      active,
      activeKey,
      categories,
      activeNames,
      tabClick,
      currentCid,
      getGoods,
      goods,
      showGoods,
      init,
    }
  },
}
</script>

<style lang="less" scoped>
#mainbox {
  margin-top: 45px;
  display: flex;
  .ordertab {
    flex: 1;
    float: right;
    height: 50px;
    z-index: 9;
    position: fixed;
    top: 45px;
    right: 0;
    left: 130px;
  }

  .leftmenu {
    position: fixed;
    top: 95px;
    left: 0;
    width: 130px;
  }

  .goodslist {
    flex: 1;
    position: absolute;
    top: 100px;
    left: 130px;
    right: 0;
    height: 100vh;
    padding: 10px;
    text-align: left !important;
    .content {
    }
  }
}

.van-card__thumb {
  width: 68px !important;
}
</style>

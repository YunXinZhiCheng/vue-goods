<template>
  <div>
    <NavBar>
      <!-- 为插槽添加内容 -->
      <template v-slot:default>商品分类</template>
    </NavBar>
    <div id="mainbox">
      <!-- 顶部排序项 -->
      <div class="ordertab"></div>

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
            />
          </van-collapse-item>
        </van-collapse>
      </van-sidebar>

      <!-- 右边商品列表 -->
      <div class="goodslist"></div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
import { onMounted, ref } from 'vue'
// 引入分类接口函数
import { getCategory } from '@/network/category.js'
export default {
  // 商品分类组件
  name: 'Category',
  components: {
    NavBar,
  },
  setup() {
    const activeKey = ref(0) // 当前选中项的索引：0
    const activeNames = ref(['1']) // 面板数组格式
    let categories = ref([]) // 分类数据默认：[]

    // 网络请求
    onMounted(() => {
      // 商品分类
      getCategory().then((res) => {
        console.log(res)
        categories.value = res.categories
      })
    })
    return {
      activeKey,
      categories,
      activeNames,
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
    // background: #333;
    width: 100%;
    height: 50px;
    z-index: 9;
    // 固定定位
    position: fixed;
    top: 45px;
    right: 0;
    left: 130px;
  }
  .leftmenu {
    // 固定定位
    position: fixed;
    top: 95px;
    left: 0;
    // background: #666;
    width: 130px;
  }
  .goodslist {
    flex: 1;
    // background: #999;
    // 绝对定位
    position: absolute;
    top: 100px;
    left: 130px;
    right: 0;
    height: 100vh;
  }
}
</style>

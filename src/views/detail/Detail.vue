<template>
  <div>
    <NavBar>
      <!-- 为插槽添加内容 -->
      <template v-slot:default>商品详情: {{ id }}</template>
    </NavBar>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'

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
  },
  setup() {
    const route = useRoute()
    let id = ref(0)
    // id.value = route.query.id

    // 模型数据
    let book = reactive({
      detail: {},
      like_goods: [],
      comments: [],
    })

    // 网络请求
    onMounted(() => {
      id.value = route.query.id
      // 商品详情数据
      getDetail(id.value).then((res) => {
        console.log(res)
        book.detail = res.goods
        book.like_goods = res.like_goods
      })
    })
    return {
      id,
      ...toRefs(book),
    }
  },
}
</script>

<style scoped></style>

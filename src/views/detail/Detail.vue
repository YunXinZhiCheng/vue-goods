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

import { ref, toRefs } from 'vue'
// 导入路由
import { useRoute } from 'vue-router'

export default {
  name: 'Detail',
  components: {
    NavBar,
  },
  setup() {
    const route = useRoute()
    let id = ref(0)
    id.value = route.query.id
    return { id }
  },
}
</script>

<style scoped></style>

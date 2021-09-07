<template>
   <div>
     <NavBar>
      <!-- 为插槽添加内容 -->
      <template v-slot:default>分类页面</template>
    </NavBar>
   </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
export default {
  name: 'Category',
  components: {
    NavBar,
  },
}
</script>

<style scoped></style>

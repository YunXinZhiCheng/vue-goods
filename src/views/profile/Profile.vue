<template>
  <div>
    <NavBar>
      <!-- 为插槽添加内容 -->
      <template v-slot:default>个人中心</template>
    </NavBar>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
export default {
  name: 'Profile',
  components: {
    NavBar,
  },
}
</script>

<style scoped></style>

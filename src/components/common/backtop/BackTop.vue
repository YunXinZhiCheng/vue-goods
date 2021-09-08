<template>
  <div class="backTop" @click="backtop"></div>
</template>

<script>
export default {
  // 回到顶部组件
  name: 'BackTop',
  setup(props, { emit }) {
    return {
      backtop: () => {
        emit('bTop')
      },
    }
  },
}
</script>

<style lang="less" scoped>
.backTop {
  width: 40px;
  height: 40px;
  position: fixed;
  bottom: 80px;
  right: 30px;
  z-index: 20px;
  box-shadow: 5px 5px 5px #888;
  border-radius: 50%;
  background: url('../../../assets/images/up.png') no-repeat center center;
}
</style>

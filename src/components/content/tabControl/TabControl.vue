<template>
  <!-- 选项卡组件 -->
  <div class="tab-control">
    <div
      class="tab-control-item"
      :class="{ active: index == currentIndex }"
      v-for="(item, index) in titles"
      :key="index"
      @click="itemClick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'TabControl',
  // 接收属性
  props: {
    titles: {
      type: Array,
      default() {
        return []
      },
    },
  },
  setup(props, { emit }) {
    // 当前索引
    let currentIndex = ref(0)
    // 点击方法
    const itemClick = (index) => {
      currentIndex.value = index
      // 子传父: 触发emit(自定义事件，传递参数)
      emit('tabClick', index)
    }
    return {
      currentIndex,
      itemClick,
    }
  },
}
</script>

<style lang="less" scoped>
// 选项卡的样式
.tab-control {
  display: flex;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 14px;
  background-color: #fff;
  width: 100%;
  // 定位
  position: sticky;
  top: 44px;
  // 层次
  z-index: 10;

  .tab-control-item {
    flex: 1;
    span {
      padding: 5px;
    }
  }
  // 激活状态
  .active {
    color: var(--color-tint);
    span {
      border-bottom: 3px solid var(--color-tint);
    }
  }
}
</style>

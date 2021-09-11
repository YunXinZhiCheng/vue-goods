<template>
  <div id="nav">
    <router-link to="/" class="tab-bar-item">
      <div class="icon"><i class="iconfont icon-shouye"></i></div>
      <div>首页</div>
    </router-link>

    <router-link to="/category" class="tab-bar-item">
      <div class="icon"><i class="iconfont icon-fenlei"></i></div>
      <div>分类</div>
    </router-link>

    <router-link to="/shopcart" class="tab-bar-item">
      <div class="icon">
        <!-- 徽标 -->
        <van-badge :content="$store.state.cartCount" max="9">
          <i class="iconfont icon-gouwuchezhengpin"></i>
        </van-badge>
      </div>
      <div>购物车</div>
    </router-link>

    <router-link to="/profile" class="tab-bar-item">
      <div class="icon"><i class="iconfont icon-yonghu"></i></div>
      <div>我的</div>
    </router-link>
  </div>
  <router-view></router-view>
</template>
<script>
import { onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
  // 根组件
  name: 'App',
  setup() {
    // 状态
    const store = useStore()
    onMounted(() => {
      // 状态分发
      store.dispatch('updateCart')
    })
  },
}
</script>

<style lang="less">
// 引入全局样式
@import 'assets/css/base.css';
// 引入字体图标
@import 'assets/css/iconfont.css';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

// 导航栏样式
#nav {
  background-color: #f6f6f6;
  display: flex;
  // 固定定位：底部
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0 -3px 1px rgba(100, 100, 100, 0.1);
  z-index: 10;

  a {
    color: var(--color-text);

    &.router-link-exact-active {
      color: var(--color-high-text);
    }
  }
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 50px;
    font-size: var(--font-size);
    // 图标
    .icon {
      width: 24px;
      height: 24px;
      margin-top: 5px;
      vertical-align: middle;
      // 转为行内块元素
      display: inline-block;
    }
  }
}
</style>

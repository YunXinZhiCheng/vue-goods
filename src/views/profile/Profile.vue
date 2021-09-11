<template>
  <div id="box">
    <!-- 导航栏 -->
    <NavBar>
      <!-- 为插槽添加内容 -->
      <template v-slot:default>个人中心</template>
    </NavBar>

    <!-- 用户盒子 -->
    <div class="user-box">
      <div class="user-info">
        <div class="info">
          <img src="https://img.yzcdn.cn/vant/cat.jpeg" />
          <div class="user-desc">
            <span>昵称：{{ user.name }}</span>
            <span>登录名：{{ user.email }}</span>
            <span class="name">个性签名：相信美好的事情即将发生</span>
          </div>
        </div>
      </div>

      <ul class="user-list">
        <!-- <li class="van-hairline--bottom" @click="goTo('/collect')">
          <span>我的收藏</span>
          <van-icon name="arrow" />
        </li> -->
        <li class="van-hairline--bottom" @click="goTo('/order')">
          <span>我的订单</span>
          <van-icon name="arrow" />
        </li>
        <!-- <li class="van-hairline--bottom" @click="goTo('/setting')">
          <span>账号管理</span>
          <van-icon name="arrow" />
        </li> -->
        <li class="van-hairline--bottom" @click="goTo('/address')">
          <span>地址管理</span>
          <van-icon name="arrow" />
        </li>
        <!-- <li class="van-hairline--bottom" @click="goTo('/about')">
          <span>关于我们</span>
          <van-icon name="arrow" />
        </li> -->
      </ul>
    </div>

    <!-- 底部 -->
    <div style="margin:15px;margin-top:100px">
      <van-button round block color="#44ba80" @click="tologout">
        退出登录
      </van-button>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
import { onMounted, reactive, toRefs } from '@vue/runtime-core'
import { Toast } from 'vant'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

// 导入退出登录、用户信息接口函数
import { Logout, getUser } from '../../network/user'

export default {
  // 个人中心页面
  name: 'Profile',
  components: {
    NavBar,
  },
  setup() {
    // 状态
    const store = useStore()
    // 路由
    const router = useRouter()

    // 数据模型
    const state = reactive({
      user: {},
    })
    onMounted(() => {
      // 用户相关
      getUser().then((res) => {
        // console.log(res)
        state.user = res
      })
    })

    // 退出登录方法
    const tologout = () => {
      Logout().then((res) => {
        // 判断状态码
        if (res.status == '204') {
          Toast.success('退出成功')

          // 清除Token,本地清除 removeItem()
          window.localStorage.removeItem('token', '')

          //
          store.commit('setIsLogin', false)

          // 退出成功后：跳转到登录页面
          setTimeout(() => {
            router.push({ path: '/login' })
          }, 500)
        }
      })
    }

    // 跳转方法:传递路径与参数
    const goTo = (path, query) => {
      router.push({ path, query: query || {} })
    }

    return {
      ...toRefs(state),
      tologout,
      goTo,
    }
  },
}
</script>

<style lang="less" scoped>
#box {
  background: #fcfcfc;
  height: 100vh;
}
.user-box {
  margin-top: 65px;
  .user-header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
    width: 100%;
    height: 44px;
    line-height: 44px;
    padding: 0 10px;
    color: #252525;
    background: #fff;
    border-bottom: 1px solid #dcdcdc;
    .user-name {
      font-size: 14px;
    }
  }
  .user-info {
    width: 94%;
    margin: 10px;
    height: 115px;
    background: linear-gradient(90deg, #31c7a7, #a1c7c7);
    box-shadow: 0 2px 5px #269090;
    border-radius: 6px;
    margin-top: 50px;
    text-align: left;
    .info {
      position: relative;
      display: flex;
      width: 100%;
      height: 100%;
      padding: 25px 20px;

      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin-top: 4px;
      }
      .user-desc {
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        line-height: 20px;
        font-size: 14px;
        color: #fff;
        span {
          color: #fff;
          font-size: 14px;
          padding: 2px 0;
        }
      }
      .account-setting {
        position: absolute;
        top: 10px;
        right: 20px;
        font-size: 13px;
        color: #fff;
        .van-icon-setting-o {
          font-size: 16px;
          vertical-align: -3px;
          margin-right: 4px;
        }
      }
    }
  }
  .user-list {
    padding: 0 8px;
    margin-top: 40px;
    li {
      padding-left: 5px;
      padding-right: 5px;
      height: 40px;
      line-height: 40px;
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      .van-icon-arrow {
        margin-top: 13px;
      }
      margin: 20px 0 !important;
      background: #ffffff;
      border-radius: 3px;
    }
  }
}
</style>

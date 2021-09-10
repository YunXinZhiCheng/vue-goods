<template>
  <div>
    <NavBar>
      <!-- 为插槽添加内容 -->
      <template v-slot:default>个人中心</template>
    </NavBar>
    <div style="margin:15px;margin-top:100px">
      <van-button round block color="#44ba80" @click="tologout">
        退出登录
      </van-button>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
import { Toast } from 'vant'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

// 导入退出登录接口函数
import { Logout } from '../../network/user'

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
    return {
      tologout,
    }
  },
}
</script>

<style scoped></style>

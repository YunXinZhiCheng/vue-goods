<template>
  <div>
    <NavBar>
      <!-- 为插槽添加内容 -->
      <template v-slot:default>用户登录</template>
    </NavBar>

    <!-- 注册布局 -->
    <div style="margin-top:45px">
      <div style="text-align:center; padding-top: 45px;">
        <!-- 图片组件 -->
        <van-image
          width="10rem"
          height="5rem"
          fit="cover"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
        <!-- 表单组件 -->
        <van-form @submit="onSubmit">
          <van-cell-group inset>
            <!-- 用户名:邮箱 -->
            <van-field
              v-model="email"
              name="邮箱"
              label="邮箱"
              placeholder="电子邮箱"
              :rules="[{ required: true, message: '请填写电子邮箱' }]"
            />
            <!-- 密码 -->
            <van-field
              v-model="password"
              type="password"
              name="密码"
              label="密码"
              placeholder="密码"
              :rules="[{ required: true, message: '请填写密码' }]"
            />
          </van-cell-group>
          <!-- 立即注册 -->
          <div style="margin:16px">
            <div
              class="link-register"
              @click="$router.push({ path: '/register' })"
            >
              没有账号，立即注册
            </div>
          </div>
          <!-- 提交 -->
          <div style="margin: 16px;">
            <van-button
              round
              block
              type="primary"
              native-type="submit"
              color="#42b983"
            >
              登录
            </van-button>
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
import { Notify, Toast } from 'vant'
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'

// 导入登录接口函数
import { Login } from '@/network/user.js'

export default {
  // 登录页面
  name: 'Login',
  components: {
    NavBar,
  },
  setup() {
    // 路由
    const router = useRouter()

    // 用户登录信息
    const userinfo = reactive({
      email: '867395637@qq.com',
      password: '123456',
    })
    // 提交方法
    // const onSubmit = (values) => {
    //   console.log('submit', values)
    // }
    const onSubmit = () => {
      Login(userinfo).then((res) => {
        console.log(res.access_token)
        // 一定会返回一个token，将token保存到本地 window.localStorage
        window.localStorage.setItem('token', res.access_token) // setItem(key,value), getItem(key)

        // 在vuex isLoin

        // 登录提示
        Toast.success('登录成功')
        // 清空信息
        userinfo.email = ''
        userinfo.password = ''
        setTimeout(() => {
          router.go(-1)
        }, 500)
      })
    }

    return {
      ...toRefs(userinfo),
      onSubmit,
    }
  },
}
</script>

<style lang="less" scoped>
// 立即注册的样式
.link-register {
  font-size: 14px;
  margin-bottom: 20px;
  color: #42b983;
  display: inline-block;
  float: right;
}
</style>

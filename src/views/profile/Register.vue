<template>
  <div>
    <NavBar>
      <!-- 为插槽添加内容 -->
      <template v-slot:default>新用户注册</template>
    </NavBar>

    <!-- 注册布局 -->
    <div style="margin-top:45px">
      <div style="text-align:center; padding-top: 30px;">
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
            <!-- 用户名 -->
            <van-field
              v-model="name"
              name="用户名"
              label="用户名"
              placeholder="用户名"
              :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <!-- 密码 -->
            <van-field
              v-model="password"
              type="password"
              name="密码"
              label="密码"
              placeholder="密码"
              :rules="[{ required: true, message: '请填写密码,不能少于6位' }]"
            />
            <!-- 确认密码 -->
            <van-field
              v-model="password_confirmation"
              type="password"
              name="密码"
              label="确认密码"
              placeholder="确认密码"
              :rules="[{ required: true, message: '请填写一致密码' }]"
            />
            <!-- 邮箱 -->
            <van-field
              v-model="email"
              name="电子邮箱"
              label="电子邮箱"
              placeholder="请输入电子邮箱"
              :rules="[{ required: true, message: '请填写电子邮箱' }]"
            />
          </van-cell-group>
          <!-- 立即登录 -->
          <div style="margin:16px">
            <div class="link-login" @click="$router.push({ path: '/login' })">
              已有账号，立即登录
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
              注册
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
import { reactive, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'

// 导入注册接口函数
import { register } from '@/network/user.js'

export default {
  // 注册页面
  name: 'Register',
  components: {
    NavBar,
  },
  setup() {
    // 路由
    const router = useRouter()

    // 用户注册信息
    const userinfo = reactive({
      name: '',
      password: '',
      password_confirmation: '',
      email: '',
    })
    // 提交方法
    // const onSubmit = (values) => {
    //   console.log('submit', values)
    // }
    const onSubmit = () => {
      // 1.先验证
      if (userinfo.password != userinfo.password_confirmation) {
        // 消息通知组件（局部引入）
        Notify('两次密码不一致...')
        // Toast.fail('失败文案');
      } else {
        // 2.再提交给服务器注册
        register(userinfo).then((res) => {
          console.log(res)
          // 判断状态码
          if (res.status == '201') {
            Toast.success('注册成功')
            // 注册成功后跳转到登录页面
            setTimeout(() => {
              router.push({
                path: '/login',
              })
            }, 1000)
          }
          // 注册之后清空密码
          userinfo.password = ''
          userinfo.password_confirmation = ''
        })
      }
    }

    return {
      ...toRefs(userinfo),
      onSubmit,
    }
  },
}
</script>

<style lang="less" scoped>
// 立即登录的样式
.link-login {
  font-size: 14px;
  margin-bottom: 20px;
  color: #42b983;
  display: inline-block;
  float: right;
}
</style>

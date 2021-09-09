<template>
  <div>
    <NavBar>
      <!-- 为插槽添加内容 -->
      <template v-slot:default>新用户注册</template>
    </NavBar>

    <!--  -->
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
              :rules="[{ required: true, message: '请填写密码' }]"
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
          <!-- 提交 -->
          <div style="margin: 16px;">
            <van-button
              round
              block
              type="primary"
              native-type="submit"
              color="#42b983"
            >
              提交
            </van-button>
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
import { reactive, ref, toRefs } from 'vue'
export default {
  // 注册页面
  name: 'Register',
  components: {
    NavBar,
  },
  setup() {
    // 用户注册信息
    const userinfo = reactive({
      name: '',
      password: '',
      password_confirmation: '',
      email: '',
    })
    // 提交方法
    const onSubmit = (values) => {
      console.log('submit', values)
    }

    return {
      ...toRefs(userinfo),
      onSubmit,
    }
  },
}
</script>

<style lang="less" scoped></style>

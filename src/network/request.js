import axios from 'axios'
import { Notify, Toast } from 'vant'
import router from '../router'

export function request(config) {
  // 创建实例
  const instance = axios.create({
    baseURL: 'https://api.shop.eduwork.cn',
    timeout: 5000,
  })
  // 请求拦截
  instance.interceptors.request.use(
    (config) => {
      // 如果有一个接口需要认证才可以访问，就在这里统一设置
      const token = window.localStorage.getItem('token')
      if (token) {
        // 配置头部属性
        config.headers.Authorization = 'Bearer' + token
      }
      // 直接放行
      return config
    },
    (err) => {}
  )

  // 响应拦截
  instance.interceptors.response.use(
    (res) => {
      // 直接放行
      // 三元运算符：有data直接返回res.data，没有直接返回res
      return res.data ? res.data : res
    },
    (err) => {
      // 如果有需要授权才可以访问的接口，统一去 login 授权
      if (err.response.status == '401') {
        Toast.fail('请先登录')
        router.push({ path: '/login' })
      }

      // 如果有错误，这里面会处理，显示错误信息
      // console.log('错误信息: '+err.response.data.errors[Object.keys(err.response.data.errors)][0]);
      Notify(
        err.response.data.errors[Object.keys(err.response.data.errors)[0]][0]
      )
    }
  )

  //   返回实例
  return instance(config)
}

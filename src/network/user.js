import { request } from './request'

// 发送register注册的数据
export function register(data) {
  return request({
    url: '/api/auth/register',
    method: 'post',
    data: data, // 可以简写为data
  })
}

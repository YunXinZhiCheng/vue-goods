import { request } from './request'

// 得到home首页的所有数据
export function getHomeAllData() {
  // 配置参数,返回 Promise 对象
  return request({
    url: '/api/index',
  })
}

import { request } from './request'

// 得到home首页的所有数据
export function getHomeAllData() {
  // 配置参数,返回 Promise 对象
  return request({
    url: '/api/index',
  })
}

// 得到home首页的商品列表数据
export function getHomeGoods(type = 'sales', page = 1) {
  return request({
    // 默认请求参数
    url: '/api/index?' + type + '=1&page=' + page,
  })
}

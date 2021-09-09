import { request } from './request'

// 得到category商品分类数据
export function getCategory() {
  return request({
    url: '/api/goods',
  })
}

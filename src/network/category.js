import { request } from './request'

// 得到category商品分类数据
export function getCategory() {
  return request({
    url: '/api/goods',
  })
}

// 请求得到category商品分类数据
export function getCategoryGoods(order='sales', cid=0, page=1) {
  return request({
      url:'/api/goods?category_id='+cid+'&page='+page+'&'+order+'=1',
  })
}

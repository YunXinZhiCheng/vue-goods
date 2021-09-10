import { getCart } from '@/network/cart'

const actions = {
  // 更新购物车数量
  updateCart({ commit }) {
    getCart().then((res) => {
      commit('addCart', { count: res.data.length || 0 })
    })
  },
}

export default actions

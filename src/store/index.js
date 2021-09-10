import { createStore } from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

const state = {
  // 用户
  user: {
    // 三元判断用户token是否存在
    isLogin: window.localStorage.getItem('token') ? true : false,
  },
  // 购物车数量：默认是0
  cartCount: 0,
}

export default createStore({
  state,
  mutations,
  actions,
  getters,
})

import { createStore } from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

const state = {
  user: {
    // 三元判断用户token是否存在
    isLogin: window.localStorage.getItem('token') ? true : false,
  },
}

export default createStore({
  state,
  mutations,
  actions,
  getters,
})

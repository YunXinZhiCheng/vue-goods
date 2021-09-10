const mutations = {
  // 设置用户登录的状态
  setIsLogin(state, payload) {
    state.user.isLogin = payload
  },
  // 设置购物车的状态
  addCart(state, payload) {
    state.cartCount = payload.count
  },
}
export default mutations

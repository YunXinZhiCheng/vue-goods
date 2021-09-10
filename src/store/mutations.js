const mutations = {
    // 设置用户登录的状态
    setIsLogin(state, payload) {
        state.user.isLogin = payload
    }
}
export default mutations

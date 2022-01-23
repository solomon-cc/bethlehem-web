import Cookies from 'js-cookie'

const user = {
  state: {
    user: localStorage.getItem('user') | '',
    token: localStorage.getItem('token') || '',
    name: localStorage.getItem('nick_name') || '',
    endpoints: {
      obtainJWT: '',
      refreshJWT: ''
    }
  },
  mutations: {
    login(state, loginData) {
      state.user = loginData.user
      state.token = loginData.token
      state.id = loginData.id
      state.name = loginData.nick_name

      localStorage.setItem('id', loginData.id)
      localStorage.setItem('user', loginData.user)
      localStorage.setItem('user', loginData.nick_name)
      localStorage.setItem('token', loginData.token)
    },
    logout(state) {
      // 清除登录数据
      state.token = ''
      state.user = ''
      state.name = ''
      state.token = ''
      Cookies.remove('user')

      localStorage.removeItem('user')
      localStorage.removeItem('token')
      localStorage.removeItem('id')
      localStorage.removeItem('name')
    }
  },
  getters: {
    user(state) {
      return state.user
    }
  }
}

export default user

import { defineStore } from 'pinia'
import Cookies from 'js-cookie'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: localStorage.getItem('user') || '',
    token: localStorage.getItem('token') || '',
    name: localStorage.getItem('nick_name') || '',
    id: localStorage.getItem('id') || '',
    avatar: 'https://picsum.photos/id/103/80/80'
  }),
  getters: {
    isLoggedIn: (state) => !!state.token
  },
  actions: {
    login(loginData) {
      this.user = loginData.user
      this.token = loginData.token
      this.id = loginData.id
      this.name = loginData.nick_name || loginData.nickname || loginData.user

      localStorage.setItem('id', this.id)
      localStorage.setItem('user', this.user)
      localStorage.setItem('nick_name', this.name)
      localStorage.setItem('token', this.token)
    },
    logout() {
      this.token = ''
      this.user = ''
      this.name = ''
      this.id = ''
      Cookies.remove('user')
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      localStorage.removeItem('id')
      localStorage.removeItem('nick_name')
      localStorage.removeItem('name')
    }
  }
})

import Cookies from 'js-cookie'
import store from '@/store'

const TokenKey = 'token'

export function getToken() {
  return store.getters.token
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

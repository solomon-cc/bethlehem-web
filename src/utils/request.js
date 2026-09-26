import axios from 'axios'
import { message, confirm } from './feedback'
import { useUserStore } from '@/store/user'
import { BaseUrl } from './config'

// create an axios instance
const service = axios.create({
  baseURL: BaseUrl,
  timeout: 5000
})

// request interceptor
service.interceptors.request.use(
  config => {
    const userStore = useUserStore()
    const token = userStore.token || localStorage.getItem('token')
    if (token) {
      config.headers['token'] = token
    }
    return config
  },
  error => {
    console.error(error)
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data

    if (res.code !== 200) {
      message.error(res.msg || '请求出错')

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired
      if (res.code === 50008 || res.code === 50012 || res.code === 50014 || res.code === 40002) {
        confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '重新登录提示')
          .then(() => {
            const userStore = useUserStore()
            userStore.logout()
            location.href = '/login'
          })
          .catch(() => {})
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.error('Request error:', error)
    message.error(error.message || '网络连接异常')
    return Promise.reject(error)
  }
)

export default service

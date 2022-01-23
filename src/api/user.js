import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/v1/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export const Logout = (data) => request.delete(`api/v1/user/logout`, data)

// user
export const userList = (params) =>
  request.get(`/api/v1/user`, { params: params })

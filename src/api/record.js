import request from '@/utils/request'

// 登录API
export const Login = (data) => request.post(`api/v1/user/login`, data)
export const Logout = (data) => request.delete(`api/v1/user/logout`, data)

// 退出API

// record
export const getRecord = (params) =>
  request.get(`api/v1/student/${params.student_id}/study_record`, {
    params: params
  })

export const listRecord = (params) =>
  request.get(`api/v1/study_record`, {
    params: params
  })
export const createRecord = (data) =>
  request.post(`api/v1/student/${data.student_id}/study_record`, data)
export const updateRecord = (data) =>
  request.put(`api/v1/student/${data.student_id}/study_record`, data)
export const deleteRecord = (params) =>
  request.delete(`api/v1/student/${params.student_id}/study_record`, {
    params: params
  })

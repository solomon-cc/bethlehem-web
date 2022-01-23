import request from '@/utils/request'

// student
export const studentListAll = (params) =>
  request.get(`api/v1/student/all`, { params: params })
export const studentList = (params) =>
  request.get(`api/v1/student`, { params: params })
export const createStudent = (data) => request.post(`api/v1/student`, data)
export const updateStudent = (data) => request.put(`api/v1/student`, data)
export const deleteStudent = (params) =>
  request.delete(`api/v1/student`, {
    params: params
  })

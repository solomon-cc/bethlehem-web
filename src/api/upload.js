import request from '@/utils/request'

/**
 * 上传学生头像接口
 * @param {Blob|File} file 头像文件（已转为 AVIF 格式）
 * @param {string} studentName 学生名
 * @returns {Promise<any>}
 */
export function uploadStudentAvatar(file, studentName) {
  const formData = new FormData()
  formData.append('file', file, `${studentName}.avif`)
  formData.append('student_name', studentName)

  return request({
    url: '/api/v1/upload/avatar',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

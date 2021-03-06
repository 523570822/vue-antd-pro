import request from '@/utils/request'
import requestBland from '@/utils/requestBland.js'

export function getUsers (params) {
  return request.post(`/user/users?_sort=updateTime&_order=desc&_page=${params.current}&_limit=${params.pageSize}`)
}
export function getStudent (params) {
  return request.post(`/student/students`, params)
}
export function getExcle (params) {
  return request.post(`/student/getExcle`, params)
}
export function bland () {
  return requestBland.get(`/ScanReadIdCardInfo?OP-DEV=1&CMD-URL=4&REPEAT=1`)
// return requestBland.post(`/student/getExcle`, params)
}
export function passExam (params) {
  return request.post(`/student/passExam`, params)
}
export function nopassExam (params) {
  return request.post(`/student/nopassExam`, params)
}
export function deleteAccount (id) {
  let params = { id: id }

  return request.post(`/student/deleteStudentById`, params)
}
export function modifyPayment (params) {
  return request.post(`/student/modifyPayment`, params)
}

export function createAccount (params) {
  params.createTime = Date.now()
  params.updateTime = Date.now()
  return request.post('/student/student', params)
}

export function modifyAccount (params) {
  params.updateTime = Date.now()
  return request.post(`/student/student`, params)
}

export function getRoles () {
  return request.post('/user/roles')
}

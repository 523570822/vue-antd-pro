import request from '@/utils/request'

export function getUsers (params) {
  return request.post(`/user/users?_sort=updateTime&_order=desc&_page=${params.current}&_limit=${params.pageSize}`)
}
export function getStudent (params) {
  return request.post(`/student/students`, params)
}
export function passExam (params) {
  return request.post(`/student/passExam`, params)
}
export function nopassExam (params) {
  return request.post(`/student/nopassExam`, params)
}
export function deleteAccount (id) {
  return request.delete(`/student/students/${id}`)
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

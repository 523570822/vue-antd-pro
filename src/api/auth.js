import request from '@/utils/request'

export function login (params) {

  return request.post('/user/login', params)
}

export function logout () {
  return request.post('/user/logout')
}

export function modifyPassword (params) {
  return request.post('/user/modifyPassword', params)
}

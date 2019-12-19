import request from '@/utils/request'

export function login (params) {
  console.info('最后')
  console.info(params)
  return request.post('/user/login', params)
}

export function logout () {
  return request.post('/user/logout')
}

export function modifyPassword (params) {
  return request.post('/user/modifyPassword', params)
}

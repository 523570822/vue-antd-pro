import request from '@/utils/request'

export function login (params) {
  console.info('最后')
  console.info(params)
  return request.post('/login', params)
}

export function logout () {
  return request.get('/logout')
}

export function modifyPassword (params) {
  return request.post('/modifyPassword', params)
}

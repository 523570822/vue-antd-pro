import { Base64 } from 'js-base64'

// const salt1 = 'VUE-ANTD-PRO'
const salt1 = ''
// const salt2 = 'FRONTEND'
const salt2 = ''

export function encryptpwd (pwd) {
  return Base64.encode(salt1 + pwd + salt2)
}

export function generateOpenKeys (keyPath) {
  const openKeys = []
  for (let i = 0, len = keyPath.length; i < len; i++) {
    let subMenu = ''
    for (let j = 0; j <= i; j++) {
      subMenu += '/' + keyPath[j]
    }
    openKeys.push(subMenu)
  }

  return openKeys
}

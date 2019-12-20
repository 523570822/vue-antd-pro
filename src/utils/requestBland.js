import axios from 'axios'
import notification from 'ant-design-vue/es/notification'

// api 配置
// let api = 'http://114.116.106.203/studentapi/minipro'
// let api = 'http://127.0.0.1:8088/minipro'
let api = 'http://127.0.0.1:24010/ZKIDROnline'
let timer = null
/* export const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    axios.post(url, qs.stringify(data, {
      indices: false
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    })
      .then(response => {
        resolve(response.data);
      }, err => {
        Message.error({
          message: '请求错误或服务器异常!请联系管理员！'
        });
        reject(err)
      })
  })
} */
const onError = error => {
  console.log('响应拦截器错误')
  console.log(error)

  console.log(error.Error)
  if (error.response) {
    const status = error.response.status
    const message = error.response.statusText
    console.info('返回异常信息')
    console.info(status)
    console.info(message)
    if (status === 403) {
      notification.error({ message: '禁止访问', description: message })
    }

    if (status === 404) {
      notification.error({ message: '未知资源', description: message })
    }

    if (status === 500) {
      notification.error({
        message: '服务器错误',
        description: message
      })
    }
    if (status === 4005) {
      notification.error({ message: '账号或密码错误', description: message })
    }
    if (status === 401 && !timer) {
      timer = setTimeout(() => {
        notification.error({
          message: '未授权',
          description: '授权失败，请重新登录'
        })
        timer = null
      }, 500)
    }
  } else {
    notification.error({
      message: '信息读卡器异常',
      description: '请查看读卡设备是否正常运行'
    })
    return Promise.reject(error)
  }
  return Promise.reject(error)
}

const requestBland = axios.create({
  baseURL: api,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  transformRequest: [
    function (data, headers) {
      if (headers['Content-Type'] === 'multipart/form-data') {
        return data
      } else {
        return JSON.stringify(data)
      }
    }
  ]
})

// 请求拦截器
requestBland.interceptors.request.use(
  config => {
    // 开发环境下，如果请求是 post,put,patch,则打印数据体，方便调试
    if (process.env.NODE_ENV === 'development') {
      const { method } = config
      if (['post', 'put', 'patch'].includes(method)) {
        console.log(config.data)
      }
    }

    return config
  },
  error => {
    notification.error({
      message: '请求失败',
      description: '发送请求失败，请检查您的网络'
    })
    return Promise.reject(error)
  }
)

// 响应拦截器
requestBland.interceptors.response.use(res => {
  console.log('响应拦截器')
  console.log(res)
  const jsonPattern = /application\/json/gi
  if (jsonPattern.test(res.headers['content-type'])) {
    return res.data
  } else {
    return res
  }
}, onError)

export default requestBland

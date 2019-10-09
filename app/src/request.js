const axios = require('axios')

const instance = axios.create({
  // baseURL: 'http://rap2api.taobao.org/app/mock/230615/',
  baseURL: '/api',
  timeout: 1000
})

instance.interceptors.request.use(function (config) {
  config.headers.author = window.sessionStorage.getItem('token') || ''
  // config.withCredentials = true // 允许携带token ,这个是解决跨域产生的相关问题
  return config
}, function (error) {
  return Promise.reject(error)
})

instance.interceptors.response.use(function (response) {
  if (response.headers.author) {
    window.sessionStorage.setItem('token', response.headers.author)
  }
  response.data.code += ''
  if (response.data.code === '1') {
    return response.data
  } else if (response.data.code === '-1') {
    window.location.href = '/login'
  } else {
    weui.topTips(response.data.message)
  }
}, function (error) {
  return Promise.reject(error)
})
export default instance

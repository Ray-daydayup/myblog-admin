import axios from 'axios'
import tokenUnless from './tokenUnless'
import { getToken } from './token'
import { login } from '../api/user'
import handleResponse from './httpException'

const http = axios.create({
  baseURL: '',
  // baseURL: '/',
  timeout: 5000,
  headers: {
    'Content-type': 'application/json'
  }
})

// 请求拦截器
http.interceptors.request.use(
  async (config) => {
    const flag = tokenUnless.unless(['/user/login']).checkUrl(config.url)
    if (flag) {
      const token = getToken()
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      } else {
        const data = {
          username: 'ztr',
          password: '1021'
        }
        console.log('我去要 token 啦')
        const res = await login(data)
        if (!res) {
          console.log('没要到 token🙃 >>', res)
        }
        console.log('要到 token 啦😀 >>', res)
        config.headers.Authorization = `Bearer ${res.token}`
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
http.interceptors.response.use(
  (response) => {
    if (handleResponse(response)) {
      return response.data.data || response.data.msg
    }
    return false
  },
  (error) => {
    return handleResponse(error.response)
  }
)

export default http

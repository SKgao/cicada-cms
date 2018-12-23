import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 9000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      // config.headers.common['Token'] = getToken()
      config.headers.common['Authorization'] = 'Bearer ' + getToken()
    }
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  // response => response,

  response => {
    const res = response.data

    if (res.isSuccess === false || res.success === false) {
      Message({
        message: res.message ? res.message : '很抱歉无法继续！',
        type: 'error',
        duration: 5 * 1000
      })
      //     // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      //     if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      //       // 请自行在引入 MessageBox
      //       // import { Message, MessageBox } from 'element-ui'
      //       MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
      //         confirmButtonText: '重新登录',
      //         cancelButtonText: '取消',
      //         type: 'warning'
      //       }).then(() => {
      //         store.dispatch('FedLogOut').then(() => {
      //           location.reload() // 为了重新实例化vue-router对象 避免bug
      //         })
      //       })
      //     }
      return Promise.reject('error')
    } else if (res.code === 400) {
      debugger
      Message({
        message: res.message ? res.message : '很抱歉无法继续！',
        type: 'error',
        duration: 5 * 1000
      })
      // store.dispatch('FedLogOut').then(() => {
      //   location.reload() // 为了重新实例化vue-router对象 避免bug
      // })

      return Promise.reject(res.message)
    } else {
      return response
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service

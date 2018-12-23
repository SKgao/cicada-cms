// import { loginByUsername, logout } from '@/api/login'
import { loginByUsername } from '@/api/login'

import { getToken, setToken, removeToken } from '@/utils/auth'
// import md5 from 'js-md5'
const user = {
  state: {
    user: '',
    token: getToken(),
    roleId: '',
    setting: {
      articlePlatform: []
    },
    resource: null
  },

  mutations: {
    SET_USER: (state, user) => {
      state.user = user
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_ROLEID: (state, roleId) => {
      state.roleId = roleId
    },
    SET_RESOURCE: (state, resource) => {
      state.resource = resource
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim()
      // const password = md5(userInfo.password)
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password).then(response => {
          const data = response.data
          setToken(data.token)
          const loginInfo = new Buffer(JSON.stringify({
            username: username,
            roleId: data.roleId
          }))
          localStorage.setItem(getToken(), JSON.stringify(loginInfo))
          commit('SET_USER', username)
          commit('SET_TOKEN', data.token)
          commit('SET_ROLEID', data.roleId)

          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 路由信息标记 为了加载动态路由 避免无限循环
    GetResourcesInfo({ commit, state }) {
      return new Promise((resolve) => {
        commit('SET_RESOURCE', state.token)
        resolve()
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit, state }) {
      // return new Promise((resolve, reject) => {
      // logout(state.token).then(() => {
      return new Promise(resolve => {
        commit('SET_USER', '')
        commit('SET_TOKEN', '')
        commit('SET_ROLEID', '')
        removeToken()
        localStorage.clear()
        resolve()
        // }).catch(error => {
        //     reject(error)
        // })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_USER', '')
        commit('SET_TOKEN', '')
        commit('SET_ROLEID', '')
        removeToken()
        localStorage.clear()
        resolve()
      })
    }

  }
}

export default user

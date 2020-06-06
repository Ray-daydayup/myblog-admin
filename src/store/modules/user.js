import {
  getToken,
  setToken,
  getUser,
  setUser,
  removeToken,
  removeUser
} from '@/utils/token'
import { getUserInfo, login } from '@/api/user'
import router from '@/router'

const userStore = {
  namespaced: true,
  state: () => ({
    token: getToken(),
    info: getUser(),
    isShow: false,
    title: '登录'
  }),
  mutations: {
    CHANGE_SHOW(state, flag) {
      state.isShow = flag
    },
    SET_TOKEN(state, token) {
      state.token = token
      setToken(token)
    },
    SET_INFO(state, info) {
      state.info = info
      setUser(info)
    },
    SET_TITLE(state, title) {
      state.title = title
    }
  },
  actions: {
    showLogin({ commit }, title = '登录') {
      commit('CHANGE_SHOW', true)
      commit('SET_TITLE', title)
    },
    hideLogin({ commit }) {
      commit('CHANGE_SHOW', false)
    },
    async login({ commit, dispatch }, data) {
      const res = await login(data)
      if (res.flag) {
        commit('SET_TOKEN', res.data.token)
        dispatch('getUserInfo')
        dispatch('hideLogin')
      } else {
        commit('SET_TOKEN', null)
        removeToken()
      }
      return res
    },
    async getUserInfo({ commit }) {
      const res = await getUserInfo()
      if (res.flag) {
        commit('SET_INFO', res.data)
      } else {
        commit('SET_INFO', null)
        removeUser()
      }
      return res
    },
    loginOut({ dispatch, commit }) {
      commit('SET_TOKEN', null)
      commit('SET_INFO', null)
      removeToken()
      removeUser()
      dispatch('popup/showSnackbar', ['退出登录成功!', 'success'], {
        root: true
      })
      router.push('/')
    }
  }
}

export default userStore

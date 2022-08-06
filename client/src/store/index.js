import { createStore } from 'vuex'
import axios from '../plugins/axios'
export default createStore({
  state: {
    isOpenSidebar: false,
    isLoading: false,
    notification: null,
    page: 1,
    limit: 5,
    socketConnected: false,
    token: null,
    authenticated: false,
    user: null,
  },
  mutations: {
    setSidebar: (state, isOpenSidebar) => (state.isOpenSidebar = isOpenSidebar),
    setLoading: (state, isLoading) => (state.isLoading = isLoading),
    setPage: (state, page) => (state.page = page),
    setLimit: (state, limit) => (state.limit = limit),
    setNotification: (state, notification) => (state.notification = notification),
    setSocketState: (state, socketConnected) => (state.socketConnected = socketConnected),
    setUser: (state, user) => (state.user = user),
    setAuth: (state, status) => (state.authenticated = status),
    setToken: (state, accessToken) => (state.token = accessToken),
  },
  actions: {
    setSocket({ commit }, socket) {
      commit('setSocket', socket)
    },
    openSidebar({ commit }) {
      commit('setSidebar', true)
    },
    closeSidebar({ commit }) {
      commit('setSidebar', false)
    },
    startLoading({ commit }) {
      commit('setLoading', true)
    },
    stopLoading({ commit }) {
      commit('setLoading', false)
    },
    login({ commit }, res) {
      if (res.success) {
        axios.defaults.headers['Authorization'] = `Bearer ${res.data.token}`
        commit('setAuth', true)
        commit('setUser', res.data.user)
        commit('setToken', res.data.token)
        localStorage.setItem('accessToken', res.data.token)
      } else {
        commit('setAuth', false)
      }
    },
    logout({ commit }) {
      commit('setAuth', false)
      commit('setUser', null)
      commit('setToken', null)
      localStorage.setItem('accessToken', '')
    },
    fetchAccessToken({ commit }) {
      commit('setToken', localStorage.getItem('accessToken'))
    },
    handleNotifications({ commit }, data) {
      let notification = ''
      if (typeof data.message === 'string') {
        notification = data.message
      }
      commit('setNotification', { text: notification, type: data.success ? 'success' : 'error' })
    },
  },
  modules: {},
})

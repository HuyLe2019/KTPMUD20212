import { createRouter, createWebHistory } from 'vue-router'
import jwtDecode from 'jwt-decode'
import routes from './routes.js'
import store from '../store/index'
import axios from '../plugins/axios'
import UserService from '../services/UserService'
import ERole from '../enums/role.enum.js'

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

router.beforeEach(async (to, from, next) => {
  const localToken = localStorage.getItem('accessToken')
  const authenticated = store.state.authenticated
  try {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (!authenticated && localToken) {
        const tokenDecode = jwtDecode(localToken)
        if (tokenDecode && tokenDecode.exp && tokenDecode.exp > Date.now() / 1000) {
          axios.defaults.headers['Authorization'] = `Bearer ${localToken}`
          const { data } = await UserService.getUser(axios, tokenDecode._id)
          store.commit('setAuth', true)
          store.commit('setUser', data)
          store.dispatch('fetchAccessToken')
        } else {
          localStorage.setItem('accessToken', '')
          next({ path: '/login', params: { nextUrl: to.fullPath } })
        }
      }
      if (!authenticated && !localToken) {
        next({ path: '/login', params: { nextUrl: to.fullPath } })
      } else {
        const user = store.state.user
        if (to.matched.some((record) => record.meta.isAdmin)) {
          if (user.role === ERole.admin || user.role === ERole.root) {
            next()
          } else {
            next({ name: 'Dashboard' })
          }
        } else {
          next()
        }
      }
    } else {
      if (to.matched.some((record) => record.path === '/login' || record.path === '/signup') && (authenticated || localToken)) {
        next({ path: '/', params: { nextUrl: to.fullPath } })
      } else next()
    }
  } catch (err) {
    next({
      path: '/login',
      params: { nextUrl: to.fullPath },
    })
  }
})

export default router

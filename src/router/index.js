import { route } from 'quasar/wrappers'
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router'
import routes from './routes'
import { useAuthStore } from 'stores/auth'

export default route(function () {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory

  const router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE),
  })

  // ✅ Navigation guard
  router.beforeEach(async (to, from, next) => {
    const auth = useAuthStore()
    const requiresAuth = to.path !== '/login'
    if (requiresAuth && !auth.isLoggedIn) {
      next('/login')
    } else {
      next()
    }
  })

  return router
})

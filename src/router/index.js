import { route } from 'quasar/wrappers'
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router'
import routes from './routes'
import { useUserStore } from 'stores/user'

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

  // Guard de navegação para autenticação
  router.beforeEach(async (to, from, next) => {
  const authStore = useUserStore();

  // Verifica se o usuário está autenticado
  if (!authStore.user && localStorage.getItem('auth_token')) {
    try {
      await authStore.getUser();
    } catch (e) {
      console.log(e)
      authStore.logout();
    }
  }

  // Se a rota requer autenticação e o usuário não está autenticado
  if (to.meta.requiresAuth && !authStore.user) {
    // Armazena a rota de origem para redirecionamento após login
    authStore.returnUrl = to.fullPath;
    return next({ name: 'LoginPage' });
  }

  next();
});


  return router
})

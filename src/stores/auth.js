import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    roles: [],
  }),

  getters: {
    isLoggedIn: (state) => !!state.user,
    hasRole: (state) => (role) => state.roles.includes(role),
  },

  actions: {
    async login(credentials) {
      await api.get('/sanctum/csrf-cookie')
      await api.post('login', credentials)

      const { data } = await api.get('/api/user')
      this.user = data
      this.roles = data.roles.map((role) => role.name)

    },

    async logout() {
      await api.post('/api/logout')
      this.user = null
      this.roles = []
    },

    async fetchUser() {
      try {
        const { data } = await api.get('/api/user')
        this.user = data
        this.roles = data.roles.map((role) => role.name)
      } catch (e) {
        console.error('Erro ao buscar usuário:', e)
        this.user = null
        this.roles = []
      }
    },
  },
})

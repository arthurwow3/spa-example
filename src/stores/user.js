import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useUserStore = defineStore('user', {
  sstate: () => ({
    user: null,
    roles: [],
    returnUrl: null,
  }),

  actions: {
    setUser(userData) {
      this.user = userData?.data ?? userData
      this.roles = this.user.roles ?? []
    },

    hasRole(role) {
      return this.roles.includes(role)
    },

    async login(credentials) {
      await api.get('/sanctum/csrf-cookie')
      const response = await api.post('/login', credentials)
      this.user = response.data.user
      this.roles = response.data.roles
      localStorage.setItem('auth_token', '1') // Marca como logado
    },

    async getUser() {
      try {
        const response = await api.get('/api/user')
        this.user = response.data
        this.roles = response.data.roles || []
      } catch {
        this.user = null
        this.roles = []
        localStorage.removeItem('auth_token') // Remove token se falhar
        throw new Error('Unauthorized')
      }
    },

    async logout() {
      try {
        await api.post('/api/logout')
      } catch (e) {
        console.log(e)
        // Ignora erros se já estiver deslogado
      }

      this.user = null
      this.roles = []
      localStorage.removeItem('auth_token')
    },
  },
})

import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    roles: [],
  }),
  actions: {
    setUser(userData) {
      this.user = userData
      this.roles = userData.roles || []
    },
    hasRole(role) {
      return this.roles.includes(role)
    },
    roles() {
      return this.roles
    },
    async login(credentials) {
      await api.get('/sanctum/csrf-cookie')
      const response = await api.post('/login', credentials)
      this.user = response.data.user
      this.roles = response.data.roles
    },
    async fetchUser() {
      try {
        const response = await api.get('/api/user')
        this.user = response.data
      } catch {
        this.user = null
      }
    },
    async logout() {
      await api.post('/logout')
      this.user = null
    },
  },
})

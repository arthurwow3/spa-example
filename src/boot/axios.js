import { boot } from 'quasar/wrappers'
import axios from 'axios'

// Cria a instância principal da API
const api = axios.create({
  baseURL: 'http://localhost:8000', // URL do seu backend Laravel
  withCredentials: true            // Importante: envia e recebe cookies automaticamente
})

// Flag para garantir que o cookie CSRF seja buscado apenas uma vez por sessão
let csrfFetched = false

// Interceptor para garantir que o token CSRF foi carregado antes de requisições protegidas
api.interceptors.request.use(async config => {
  // Apenas para métodos que precisam de proteção CSRF
  const method = config.method?.toLowerCase()
  if (!csrfFetched && ['post', 'put', 'patch', 'delete'].includes(method)) {
    try {
      // Faz a requisição ao endpoint que define os cookies 'XSRF-TOKEN' e 'laravel_session'
      await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
        withCredentials: true
      })
      csrfFetched = true
    } catch (error) {
      console.error('Erro ao buscar o CSRF cookie:', error)
    }
  }

  // Garante que o cabeçalho X-XSRF-TOKEN será enviado manualmente (boa prática extra)
  const matches = document.cookie.match(/XSRF-TOKEN=([^;]+)/)
  if (matches) {
    const token = decodeURIComponent(matches[1])
    config.headers['X-XSRF-TOKEN'] = token
  }

  return config
})

export default boot(({ app }) => {
  // Registra as instâncias no contexto global do Quasar
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { axios, api }

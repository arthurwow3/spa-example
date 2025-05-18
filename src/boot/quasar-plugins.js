import { Notify } from 'quasar'

export default async ({ app }) => {
  app.config.globalProperties.$q = {
    notify: Notify.create,
  }
}

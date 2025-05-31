<template>
  <q-layout>
    <q-page-container>
      <q-page class="q-pa-md flex flex-center">
        <q-form @submit.prevent="onSubmit" class="q-gutter-md" style="width: 300px">
          <q-input v-model="email" label="E-mail" type="email" filled />
          <q-input v-model="password" label="Senha" type="password" filled />
          <q-btn label="Entrar" type="submit" color="primary" class="full-width" />
        </q-form>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useUserStore } from 'stores/user'

const email = ref('')
const password = ref('')
const router = useRouter()
const $q = useQuasar()
const authStore = useUserStore()

const onSubmit = async () => {
  const credentials = {
    email: email.value,
    password: password.value,
  }

  try {
    await authStore.login(credentials)

    const redirectPath = authStore.returnUrl || '/'
    authStore.returnUrl = null

    $q.notify({
      type: 'positive',
      message: 'Login realizado com sucesso',
    })

    router.push(redirectPath)
  } catch (error) {
    console.log(error)
    $q.notify({
      type: 'negative',
      message: 'Falha no login. Verifique suas credenciais.',
    })
  }
}
</script>

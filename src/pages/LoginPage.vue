<template>
  <q-layout>
    <q-page-container>
      <q-page class="q-pa-md flex flex-center">
        <q-form @submit="onSubmit" class="q-gutter-md" style="width: 300px">
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
import { useAuthStore } from 'stores/auth'

const email = ref('')
const password = ref('')
const router = useRouter()
const $q = useQuasar()
const auth = useAuthStore()

const onSubmit = async () => {
  try {
    await auth.login({ email: email.value, password: password.value })

    $q.notify({
      type: 'positive',
      message: 'Login realizado com sucesso',
    })

    router.push('/') // Redireciona para IndexPage
  } catch (err) {
    console.log(err)
    $q.notify({
      type: 'negative',
      message: 'Falha no login. Verifique suas credenciais.',
    })
  }
}
</script>

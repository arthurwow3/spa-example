<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          Minha SPA
        </q-toolbar-title>

        <q-btn label="Logout" color="negative" @click="logout" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { api } from 'boot/axios'
import { useRouter } from 'vue-router'

const router = useRouter()

async function logout () {
  try {
    await api.post('api/logout')
    alert('Logout realizado com sucesso.')
    router.push('/login')
  } catch (error) {
    alert('Erro ao realizar logout')
    console.error(error)
  }
}
</script>

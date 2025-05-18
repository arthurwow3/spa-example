<template>
  <q-page padding>
    <h3>Menu baseado em permissões</h3>

    <q-list bordered class="q-mt-md">
      <q-item v-if="hasRole('admin')" clickable>
        <q-item-section>Área do Administrador</q-item-section>
      </q-item>
      <q-item v-if="hasRole('editor')" clickable>
        <q-item-section>Área de Edição</q-item-section>
      </q-item>
      <q-item v-if="hasRole('viewer')" clickable>
        <q-item-section>Visualização</q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup>
import { useAuthStore } from 'stores/auth'

const auth = useAuthStore()
const hasRole = (role) => auth.hasRole(role)

console.log(auth.roles)
</script>

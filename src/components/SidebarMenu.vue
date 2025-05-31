<template>
  <q-list padding class="tw-text-gray-700">
    <q-item
      v-for="item in filteredMenu"
      :key="item.label"
      clickable
      :to="item.to"
      active-class="q-item-no-border text-primary"
    >
      <q-item-section avatar>
        <q-icon :name="item.icon" />
      </q-item-section>
      <q-item-section>{{ item.label }}</q-item-section>
    </q-item>

    <q-separator spaced />

    <q-item clickable @click="logout">
      <q-item-section avatar>
        <q-icon name="logout" />
      </q-item-section>
      <q-item-section>Sair</q-item-section>
    </q-item>
  </q-list>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { useUserStore } from 'stores/user'

const props = defineProps({
  roles: {
    type: Array,
    default: () => []
  }
})

const router = useRouter()
const userStore = useUserStore()

const logout = async () => {
  await userStore.logout()
  router.push('/login')
}

const menuItems = [
  { label: 'Página Inicial', icon: 'home', to: '/', roles: [] },
  { label: 'Administração', icon: 'admin_panel_settings', to: '/admin', roles: ['admin'] },
  { label: 'Edição', icon: 'edit', to: '/editor', roles: ['editor'] },
  { label: 'Visualização', icon: 'visibility', to: '/viewer', roles: ['viewer'] }
]

const roleNames = computed(() => props.roles.map(r => r.name))

const filteredMenu = computed(() => {
  return menuItems.filter(item => {
    return item.roles.length === 0 || item.roles.some(role => roleNames.value.includes(role))
  })
})
</script>

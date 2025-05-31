<template>
  <q-layout view="hHh lpR fFf" class="tw-bg-gray-50">
    <!-- Top Header -->
    <TopHeader @toggle-left-drawer="toggleLeftDrawer" />

    <!-- Left Drawer -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="tw-bg-white"
    >
      <SidebarMenu :roles="userStore.roles" />
    </q-drawer>

    <!-- Main Page Content -->
    <q-page-container class="tw-p-4">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import TopHeader from 'components/TopHeader.vue'
import SidebarMenu from 'components/SidebarMenu.vue'
import { useUserStore } from 'stores/user'

const leftDrawerOpen = ref(true)
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const userStore = useUserStore()
</script>

<style scoped>
</style>

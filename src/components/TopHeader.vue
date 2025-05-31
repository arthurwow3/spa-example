<template>
  <q-header elevated class="bg-white text-black">
    <q-toolbar class="q-px-md q-py-md q-gutter-md justify-between q-pb-">
      <!-- Esquerda: Botão de menu, logo e título -->
      <div class="row items-center q-gutter-sm">
        <q-btn flat dense round icon="menu" @click="$emit('toggle-left-drawer')" />

        <q-avatar size="32px">
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg" />
        </q-avatar>

        <div class="text-subtitle1 text-weight-medium">
          Painel Administrativo
        </div>
      </div>

      <!-- Direita: Avatar -->
      <q-avatar size="32px">
        <img src="https://randomuser.me/api/portraits/men/85.jpg" />
      </q-avatar>
    </q-toolbar>
  </q-header><br>
</template>

<script setup>
</script>

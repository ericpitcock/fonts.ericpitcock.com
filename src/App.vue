<template>
  <ep-button
    v-if="isDev && $route.name === 'category'"
    class="json-button"
    label="Toggle JSON"
    @click="toggleJSON"
  />
  <router-view />
</template>

<script setup>
  import { useFontsStore } from '@/store/fontsStore'
  const fontsStore = useFontsStore()

  const toggleJSON = () => {
    fontsStore.showJSON = !fontsStore.showJSON
  }

  const isDev = import.meta.env.DEV
</script>

<style lang="scss" scoped>
  .json-button {
    position: fixed;
    bottom: 10px;
    left: 10px;
    z-index: 2;
  }
</style>

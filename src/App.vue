<template>
  <ep-button
    v-if="isDev && $route.name === 'index'"
    class="json-button"
    label="Toggle JSON"
    @click="$store.commit('toggleJSON')"
  />
  <router-view />
</template>

<script setup>
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

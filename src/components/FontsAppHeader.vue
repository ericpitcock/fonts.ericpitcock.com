<template>
  <ep-header>
    <template #left>
      <slot name="left" />
    </template>
    <template #center>
      <slot name="center" />
    </template>
    <template #right>
      <ep-theme-toggle
        class="app-header-button ep-button-var--ghost"
        :current-theme="theme"
        @toggle-theme="toggleTheme"
      />
    </template>
  </ep-header>
</template>

<script setup>
  import { computed } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()

  const toggleTheme = () => store.dispatch('toggleTheme')
  const theme = computed(() => store.state.theme)
</script>

<style lang="scss" scoped>
  .ep-header {
    --ep-header-container-padding: 0 2rem;
    --ep-header-container-bg-color: var(--interface-surface);
    --ep-header-left-gap: 2rem;
  }
</style>
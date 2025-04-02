<template>
  <ep-header v-bind="$attrs">
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

  import { useFontsStore } from '@/store/fontsStore'

  defineOptions({
    inheritAttrs: false
  })

  const fontsStore = useFontsStore()

  const toggleTheme = () => fontsStore.toggleTheme()
  const theme = computed(() => fontsStore.theme)
</script>

<style lang="scss" scoped>
  .ep-header {
    --ep-header-container-padding: 0 2rem;
    --ep-header-container-bg-color: var(--interface-surface);
    --ep-header-left-gap: 2rem;
  }
</style>
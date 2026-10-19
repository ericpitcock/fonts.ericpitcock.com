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
      />
    </template>
  </ep-header>
</template>

<script setup>
  defineOptions({
    inheritAttrs: false
  })

</script>

<style lang="scss" scoped>
  .ep-header {
    --ep-header-padding: 0 2rem;
    --ep-header-bg-color: var(--interface-surface);
    --ep-header-left-gap: 2rem;
  }
</style>
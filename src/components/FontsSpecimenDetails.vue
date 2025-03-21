<template>
  <header>
    <router-link to="/">Back to index</router-link>
    <div>{{ font.family }}</div>
  </header>
</template>

<script setup>
  defineProps({
    font: {
      type: Object,
      required: true
    }
  })
</script>

<style lang="scss" scoped>
  header {
    grid-row: 1;
    grid-column: 1/2;
    display: flex;
    flex-direction: column;
    padding: 3rem;
    // background: var(--interface-surface);
    border-right: 0.1rem solid var(--border-color);
  }
</style>
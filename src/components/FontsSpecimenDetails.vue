<template>
  <header>
    <div>Font header</div>
    <router-link to="/">Back to index</router-link>
  </header>
</template>

<script setup>
</script>

<style lang="scss" scoped>
  header {
    grid-row: 1;
    grid-column: 1/2;
    display: flex;
    flex-direction: column;
    padding: 3rem;
    background: var(--interface-surface);
    border-right: 0.1rem solid var(--border-color);
  }
</style>
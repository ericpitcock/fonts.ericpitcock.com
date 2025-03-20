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
    // option for sticky header
    position: sticky;
    top: 0;
    z-index: 1;
    // end option
    grid-row: 1;
    grid-column: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;
    background: white;
    border-bottom: 1px solid var(--border-color);
    flex: 0 0 auto;
  }
</style>
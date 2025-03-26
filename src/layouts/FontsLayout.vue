<template>
  <div class="grid">
    <slot name="sidebar" />
    <slot name="main" />
  </div>
</template>

<style lang="scss">
  .grid {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 200px 1fr;
    grid-column-gap: 0;
    width: 100%;
    height: 100%;
  }
</style>
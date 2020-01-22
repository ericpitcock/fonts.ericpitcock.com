<template>
  <div class="grid">
    <slot name="header"></slot>
    <main>
      <slot name="top"></slot>
      <slot name="main"></slot>
    </main>
  </div>
</template>

<script>
  export default {
    name: 'Layout'
  }
</script>

<style lang="scss">
  .grid {
    display: grid;
    grid-template-rows: 110px 1fr;
    grid-template-columns: 1fr;
    grid-column-gap: 0;
    width: 100vw;
    // height: 100vh;
  }
  header {

  }
  main {
    grid-row: 2;
    grid-column: 1;
    // display: flex;
    // justify-content: center;
    // overflow: scroll;
    background: #fff;
    .container {
      width: 100vw;
      display: flex;
      justify-content: center;
      .content {
        flex: 0 1 1200px;
        padding-right: 30px;
        padding-left: 30px;
      }
    }
  }
</style>
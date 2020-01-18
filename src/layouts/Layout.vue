<template>
  <div class="container">
    <slot name="header"></slot>
    <main>
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
  .container {
    display: grid;
    grid-template-rows: 130px 1fr;
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
    display: flex;
    justify-content: center;
    // overflow: scroll;
    background: #fff;
    .content {
      flex: 0 1 1200px;
      height: 100%;
      padding: 30px 30px 100px 30px;
    }
  }
</style>
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
    grid-template-rows: 1fr;
    grid-template-columns: 200px 1fr;
    grid-column-gap: 0;
    width: 100vw;
    // height: 100vh;
  }

  main {
    grid-row: 1;
    grid-column: 2;

    // display: flex;
    // justify-content: center;
    // overflow: scroll;
    // background: #fff;
    .container {
      // width: 100vw;
      display: flex;

      // justify-content: center;
      .content {
        flex: 1;
        // padding-right: 30px;
        // padding-left: 30px;
      }
    }
  }
</style>
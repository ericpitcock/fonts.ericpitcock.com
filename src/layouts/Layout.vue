<template>
  <div class="container">
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot name="main"></slot>
    </main>
  </div>
</template>

<script>
export default {

}
</script>

<style>
  .container {
    
  }
  header {

  }
  main {
    grid-row: 2;
    grid-column: 1;
    padding: 0 30px 30px 30px;
    overflow: scroll;
    background: #fff;
  }
</style>
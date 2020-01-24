<template>
  <router-link to="/" class="title">
    <div>Fonts</div>
  </router-link>
</template>

<script>
  export default {
    name: 'Title'
  }
</script>

<style lang="scss" scoped>
  .title {
    display: inline-block;
    margin-right: auto;
    text-decoration: none;
    color: black;
    div {
      display: block;
      height: 20px;
      line-height: 21px;
      padding-left: 30px;
      background: url('/img/e.svg') left center no-repeat;
    }
  }
</style>

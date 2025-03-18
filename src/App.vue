<template>
  <div id="app">
    <!-- <button
      class="json-button"
      @click="$store.dispatch('toggleJSON')"
    >Toggle JSON</button> -->
    <Layout>
      <template #header>
        <Header v-if="$route.name == 'index'" />
        <HeaderFont v-if="$route.name == 'font'" />
      </template>

      <template #main>
        <router-view></router-view>
      </template>
    </Layout>
  </div>
</template>

<script>
  import Header from '@/components/Header.vue'
  import HeaderFont from '@/components/HeaderFont.vue'
  import Layout from '@/layouts/Layout.vue'

  export default {
    name: 'App',
    components: {
      Header,
      HeaderFont,
      Layout
    }
  }
</script>

<style lang="scss">
  @font-face {
    font-family: 'CallingCode-Regular';
    src: url('./assets/fonts/390A5D_0_0.woff2') format('woff2');
  }

  body {
    display: flex;
    justify-content: center;
    background: hsl(0, 0%, 98%);
  }

  body,
  input,
  select,
  textarea {
    font-family: 'CallingCode-Regular', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    font-size: 14px;
    color: black;
  }

  #app {
    width: 100%;
    height: 100%;
  }

  .json-button {
    position: fixed;
    top: 10px;
    left: 10px;
    z-index: 2;
  }
</style>

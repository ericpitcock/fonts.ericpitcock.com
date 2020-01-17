<template>
  <div id="app">
    <button class="json-button" @click="$store.dispatch('toggleJSON')">Show JSON</button>
    <Layout>
      <template v-slot:header>
        <Header />
      </template>
      <template v-slot:main>
        <router-view></router-view>
      </template>
    </Layout>
  </div>
</template>

<script>
  import Header from '@/components/Header'
  import Layout from '@/layouts/Layout'

  export default {
    name: 'App',
    components: {
      Header,
      Layout
    }
  }
</script>

<style lang="scss">
  #app {
    width: 100vw;
    height: 100vh;
  }
  .json-button {
    position: absolute;
    top: 10px;
    left: 10px;
  }
</style>

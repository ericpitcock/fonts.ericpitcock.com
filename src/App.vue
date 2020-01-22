<template>
  <div id="app">
    <button class="json-button" @click="$store.dispatch('toggleJSON')">Show JSON</button>
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
  import Header from '@/components/Header'
  import HeaderFont from '@/components/HeaderFont'
  import Layout from '@/layouts/Layout'

  export default {
    name: 'App',
    components: {
      Header,
      HeaderFont,
      Layout
    },
    mounted() {
      this.$store.dispatch('fetchGoogleFonts')
    }
  }
</script>

<style lang="scss">
/*! minireset.css v0.0.4 | MIT License | github.com/jgthms/minireset.css */html,body,p,ol,ul,li,dl,dt,dd,blockquote,figure,fieldset,legend,textarea,pre,iframe,hr,h1,h2,h3,h4,h5,h6{margin:0;padding:0}h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:normal}ul{list-style:none}button,input,select,textarea{margin:0}html{box-sizing:border-box}*,*:before,*:after{box-sizing:inherit}img,embed,iframe,object,video{height:auto;max-width:100%}audio{max-width:100%}iframe{border:0}table{border-collapse:collapse;border-spacing:0}td,th{padding:0;text-align:left}
  @font-face {
    font-family: 'CallingCode-Regular';
    src: url('/fonts/390A5D_0_0.woff2') format('woff2');
  }
  body {
    display: flex;
    justify-content: center;
  }
  body, input, select, textarea {
    font-family: 'CallingCode-Regular', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    font-size: 14px;
    color: black;
  }
  // .app {
  //   width: 100%;
  //   height: 100vh;
  //   display: grid;
  //   grid-template-rows: 130px 1fr;
  //   grid-template-columns: 1fr;
  //   grid-column-gap: 0;
  // }
  #app {
    width: 100%;
    height: 100%;
  }
  .json-button {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 2;
  }
</style>

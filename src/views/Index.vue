<template>
  <div>
    <FontContainer
      v-for="(font, index) in getActiveFonts"
      :key="index"
      :font="font"
    />
  </div>
</template>

<script>
  import FontContainer from '@/components/FontContainer'
  import { mapActions, mapGetters } from 'vuex'
  // import flexFilter from './filter.js'

  export default {
    name: 'App',
    components: {
      FontContainer
    },
    data() {
      return {

      }
    },
    computed: {
      ...mapGetters([
        'getActiveFonts',
        'getCategoryFilter',
        'getCustomSample',
        'getFilteredFonts',
        'getFontCategories',
        'getFontSample',
        'getGlobalFontSize',
        'getGoogleFonts',
        'getRecommendedFonts',
        'getRecommendedOnly',
        'getWhitelistedFonts'
      ]),
      // activeFonts() {
      //   return (this.getRecommendedOnly) ? this.getRecommendedFonts : this.getFilteredFonts
      // },
      // customSample: {
      //   get() {
      //     return this.getCustomSample
      //   },
      //   set(value) {
      //     this.$store.dispatch('updateCustomSample', value)
      //   }
      // },
      // fontSize: {
      //   get() {
      //     return this.getGlobalFontSize
      //   },
      //   set(value) {
      //     this.$store.dispatch('updateGlobalFontSize', value)
      //   }
      // },
      fontCount() {
        return this.getWhitelistedFonts.length
      }
    },
    methods: {
      ...mapActions([
        'updateCategoryFilter',
        'updateFontSample'
      ]),
      // customFocus() {
      //   this.$store.dispatch('updateFontSample', 'CustomSample')
      // }
    },
    mounted() {
      this.$store.dispatch('fetchGoogleFonts')
    },
    watch: {
      getRecommendedOnly: function() {

      }
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
  .app {
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template-rows: 130px 1fr;
    grid-template-columns: 1fr;
    grid-column-gap: 0;
  }
  // .json-button {
  //   position: absolute;
  //   top: 10px;
  //   left: 10px;
  // }
  
  // main {
  //   grid-row: 2;
  //   grid-column: 1;
  //   padding: 0 30px 30px 30px;
  //   overflow: scroll;
  //   background: #fff;
  // }
  small {
    font-size: 10px;
  }
</style>

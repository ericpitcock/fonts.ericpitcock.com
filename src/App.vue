<template>
  <div id="app">
    <header>
      <div class="category-filters">
        <span
          v-for="(category, index) in categories"
          :key="index"
          @click="filters.category = category"
          :class="['category-filters__filter-button', { 'active': filters.category == category }]"
        >
          <span v-if="category == 'sans-serif'">TEXT</span>
          <span v-if="category == 'display'">HEADLINE</span>
          {{ category }}
        </span>
        <span>
          <input type="checkbox" id="recommended" name="recommended" checked>
          <label for="recommended">Recommended only</label>
        </span>
        <span class="font-count">
          {{ fontCount }} fonts
        </span>
      </div>
      <div class="sample-control">
        <div
          v-for="(sampleType, index) in ['FontNameSample', 'AlphabetSample', 'ParagraphSample', 'TableSample']"
          :key="index"
          :class="['sample-control__button', { 'sample-control__button--active': fontSample == sampleType }]"
          @click="fontSample = sampleType"
        >
          {{ sampleType }}
        </div>
        <input class="custom-sample-input" v-model="customSample" @focus="customFocus()" type="text" placeholder="Enter your own words">
        <button @click="showJSON = !showJSON">Show JSON</button>
      </div>
    </header>
    <main>
      <div
        v-for="(font, index) in filteredFonts"
        :key="index"
        class="font"
      >
        <div class="left">
          <div class="font__name">
            <!-- <span v-if="sampleType != null">{{ font.family }}</span> -->
            <span>{{ font.family }}</span>
          </div>
          <div class="font__info">
            <!-- <span v-for="variant in font.variants" :key="key()">{{ variant }}</span> -->
            <span>{{ fontInfo(font) }}</span>
          </div>
        </div>
        <div
          class="font__sample"
          :style="{ fontFamily: font.family }"
        >
          <!-- {{ customSample || sample(font) }} -->
          <component :is="fontSample" />
        </div>
        <small v-if="showJSON">
          <pre>{{ font }}</pre>
        </small>
      </div>
    </main>
  </div>
</template>

<script>
  import AlphabetSample from '@/components/samples/AlphabetSample'
  import CustomSample from '@/components/samples/CustomSample'
  import FontNameSample from '@/components/samples/FontNameSample'
  // import LayoutSample from '@/components/samples/LayoutSample'
  import ParagraphSample from '@/components/samples/ParagraphSample'
  import TableSample from '@/components/samples/TableSample'
  import WebFont from 'webfontloader'
  // import flexFilter from './filter.js'

  export default {
    name: 'App',
    components: {
      AlphabetSample,
      CustomSample,
      FontNameSample,
      // LayoutSample,
      ParagraphSample,
      TableSample
    },
    data() {
      return {
        // customSample: '',
        filters: {
          category: 'monospace'
          // variants: ['2'],
          // subsets: ['latin']
        },
        fontSample: 'FontNameSample',
        criteria: [
          { Field: 'category', Values: ['monospace'] },
          // { Field: 'variants', Values: ['700'] }
        ],
        googleFonts: [],
        loadedFonts: [],
        // sampleType: null,
        showJSON: false
      };
    },
    computed: {
      customSample: {
        get() {
          return this.$store.state.customSample
        },
        set(value) {
          // this.$store.dispatch('updateCustomSample', value)
          this.$store.dispatch('updateCustomSample', value)
        }
      },
      categories() {
        return new Set(this.googleFonts.map(font => font.category))
      },
      filteredFonts() {
        return this.googleFonts.filter(font => font.category == this.filters.category)
      },
      fontCount() {
        return this.filteredFonts.length
      }
    },
    methods: {
      customFocus() {
        this.fontSample = 'CustomSample'
        console.log('custom focus')
        
      },
      sample(font) {
        switch (this.sampleType) {
          case 'custom':
            return this.customSample
            break;
          case 'alphabet':
            return '<p>ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz<br />‘?’“!”(%)[#]{@}/&\<-+÷×=>®©$€£¥¢:;,.*</p>'
            break;
          case 'paragraph':
            return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed maximus tincidunt gravida. Integer tincidunt, nisi at luctus sagittis, felis leo molestie velit, sed semper orci mauris ullamcorper ante. Vestibulum sed dapibus eros. Morbi finibus nisi interdum lorem malesuada, in laoreet mauris consequat. Quisque eget metus rhoncus, mattis nisi non, pretium massa. Duis at condimentum massa. Maecenas condimentum faucibus ante, sit amet laoreet est auctor vitae. Donec sed risus lorem. Nam aliquam sapien in accumsan porta.'
            break;
          case 'layout':
            return 'layout'
            break;
          case 'table':
            return 'table'
            break;
          default:
            return font.family
            break;
        }
      },
      fetchGoogleFonts() {
        fetch(
          'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyC4LPtjlhXImnuIBnGbYCgwRLYoXDZ2i8c'
        )
        .then(response => response.json())
        .then(response => this.googleFonts = response.items)
      },
      fontInfo(font) {
        let label = font.variants.length > 1 ? 'weights' : 'weight'
        // if it doesn't have italics
        if (!font.variants.includes('italic')) {
          return `${font.variants.length} ${label}`
        } else {
          return `${font.variants.length / 2} ${label} w/ italics`
        }
      },
      // key() {
      //   return Math.random() * (999 - 1) + 1
      // },
      loadFonts() {
        WebFont.load({
          google: {
            families: this.loadedFonts
          },
          loading: function() {
            this.fontsLoaded = false
          },
          active: function() {
            this.fontsLoaded = true
          },
          inactive: function() {
            this.fontsLoaded = false
          },
          fontloading: function(familyName, fvd) {
            this.fontsLoaded = false
          },
          fontactive: function(familyName, fvd) {
            this.fontsLoaded = true
          },
          fontinactive: function(familyName, fvd) {
            this.fontsLoaded = false
          }
        });
      }
    },
    mounted() {
      this.fetchGoogleFonts()
      
      // load fonts when visible
      // var callback = function(entries, observer) { 
      //   entries.forEach(entry => {
      //     console.log(entry)
      //   })
      // }
      // var options = {
      //   root: null,
      //   rootMargin: '0px',
      //   threshold: 1.0
      // }
      // var observer = new IntersectionObserver(callback, options)
      
      // var target = document.querySelector('.font')
      // observer.observe(target)
      
    },
    watch: {
      filteredFonts: function() {
        let fonts = this.filteredFonts.map(font => font.family)
        this.loadedFonts = fonts
        this.loadFonts()
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
  #app {
    flex: 0 1 1200px;
    height: 100%;
    display: flex;
    flex-direction: column
  }
  header {
    // position: sticky;
    // top: 0;
    padding: 30px;
    background: white;
    border-bottom: 1px solid #d3d3d3;
    flex: 0 0 auto;
    > * + * {
      margin-top: 20px;
    }
  }
  .category-filters {
    // display: flex;
    // align-content: center;
    // justify-content: center;
    // background: red;
    // padding: 20px 0 0 30px;
    &__filter-button {
      text-transform: capitalize;
    }
    span {
      // position: relative;
      // padding: 0 0 3px 0;
      // border: 1px solid transparent;
      cursor: pointer;
      &.active {
        // border-bottom: 2px solid black;
        color: red;
      }
      & + span { margin-left: 20px; }
    }
  }
  .sample-control {
    display: flex;
    margin-left: -6px;
    &__button {
      display: flex;
      align-items: center;
      height: 29px;
      padding: 2px 10px 0 10px;
      border: 1px solid #e6e6e6;
      font-size: 11px;
      &:hover:not(.sample-control__button--active) {
        background: lighten(yellow, 40%);
        cursor: pointer;
      }
      &--active {
        background: yellow;
      }
      & + & {
        border-left: none;
      }
      &:first-child {
        padding-left: 15px;
        border-radius: 15px 0 0 15px;
      }
      &:last-child {
        padding-right: 15px;
        border-radius: 0 15px 15px 0;
      }
    }
    .custom-sample-input {
      width: 300px;
      padding: 0 15px;
      border: 1px solid #e6e6e6;
      border-left: none;
      border-radius: 0 15px 15px 0;
      font-size: 11px;
      &::placeholder {
        font-size: 11px;
        color: black;
      }
      &:focus {
        background: yellow;
        outline: none;
      }
    }
  }
  .font-count {
    font-size: 12px;
    color: gray;
  }
  main {
    flex: 0 1 calc(100vh - 100px);
    padding: 30px;
    overflow: scroll;
    background: #fff;
  }
  .font {
    display: flex;
    // align-items: center;
    // flex-direction: column;
    padding: 60px 20px;
    // background: #fff;
    border-top: 1px solid #e6e6e6;
    border-bottom: 1px solid #e6e6e6;
    &:hover {
      // background: #fcfcfc;
      // border-color: #e6e6e6;
      cursor: pointer;
    }
    & + & {
      margin-top: -1px;
    }
    .left {
      flex: 0 0 200px;
    }
    &__name {
      flex: 0 0 30px;
      display: flex;
      align-items: center;
      color: blue;
      // background: lightseagreen;
    }
    &__sample {
      flex: 1 1 auto;
      // font-size: 40px;
      // background: lightgrey;
    }
    &__info {
      flex: 0 0 30px;
      display: flex;
      align-items: center;
      color: gray;
      // background: lightskyblue;
    }
  }
  small {
    font-size: 10px;
  }
</style>

<template>
  <div id="app">
    <button class="json-button" @click="$store.dispatch('toggleJSON')">Show JSON</button>
    <header>
      <div class="category-filters">
        <span
          v-for="(category, index) in getFontCategories"
          :key="index"
          @click="$store.dispatch('updateCategoryFilter', category)"
          :class="['category-filters__filter-button', { 'category-filters__filter-button--active': getCategoryFilter == category }]"
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
          :class="['sample-control__button', { 'sample-control__button--active': getFontSample == sampleType }]"
          @click="$store.dispatch('updateFontSample', sampleType)"
        >
          {{ sampleType }}
        </div>
        <input class="custom-sample-input" v-model="customSample" @focus="customFocus()" type="text" placeholder="Enter your own words">
        <div class="font-size-slider">
          <input name="font-size" type="range" min="12" max="60" v-model="fontSize" step="1" v-once>
          <label for="font-size">{{ fontSize }}px</label>
        </div>
      </div>
    </header>
    <main>
      <FontContainer
        v-for="(font, index) in getWhitelistedFonts"
        :key="index"
        :class="font.family.toLowerCase().split(' ').join('')"
        :font="font"
      />
    </main>
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
        // fontSample: 'FontNameSample',
        criteria: [
          { Field: 'category', Values: ['monospace'] },
          // { Field: 'variants', Values: ['700'] }
        ],
        loadedFonts: [],
        showJSON: false
      };
    },
    computed: {
      ...mapGetters([
        'getCategoryFilter',
        'getCustomSample',
        'getFilteredFonts',
        'getFontCategories',
        'getFontSample',
        'getGlobalFontSize',
        'getGoogleFonts',
        'getWhitelistedFonts'
      ]),
      customSample: {
        get() {
          return this.getCustomSample
        },
        set(value) {
          this.$store.dispatch('updateCustomSample', value)
        }
      },
      fontSize: {
        get() {
          return this.getGlobalFontSize
        },
        set(value) {
          this.$store.dispatch('updateGlobalFontSize', value)
        }
      },
      fontCount() {
        return this.getWhitelistedFonts.length
      }
    },
    methods: {
      ...mapActions([
        'updateCategoryFilter',
        'updateFontSample'
      ]),
      customFocus() {
        this.$store.dispatch('updateFontSample', 'CustomSample')
      }
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
  #app {
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template-rows: 130px 1fr;
    grid-template-columns: 1fr;
    grid-column-gap: 0;
  }
  .json-button {
    position: absolute;
    top: 10px;
    left: 10px;
  }
  header {
    grid-row: 1;
    grid-column: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;
    background: white;
    border-bottom: 1px solid #d3d3d3;
    flex: 0 0 auto;
    > * + * {
      margin-top: 20px;
    }
  }
  .category-filters {
    &__filter-button {
      text-transform: capitalize;
      cursor: pointer;
      & + span { margin-left: 20px; }
      &--active {
        color: red;
      }
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
    }
    .custom-sample-input {
      width: 300px;
      padding: 2px 0 0 15px;
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
    .font-size-slider {
      display: flex;
      align-items: center;
      margin-left: 20px;
      label {
        margin-left: 10px;
      }
    }
  }
  .font-count {
    font-size: 12px;
    color: gray;
  }
  main {
    grid-row: 2;
    grid-column: 1;
    padding: 0 30px 30px 30px;
    overflow: scroll;
    background: #fff;
  }
  small {
    font-size: 10px;
  }
</style>

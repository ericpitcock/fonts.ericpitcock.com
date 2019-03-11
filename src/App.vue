<template>
  <div id="app">
    <header>
      <ul>
        <li
          v-for="category in categories"
          :key="key()"
          @click="filters.category = category"
          :class="{ 'active': filters.category == category }"
        >
          {{ category }}
        </li>
      </ul>
    </header>
    <div class="controls">
      <button>String (enter own, random)</button>
      <input v-model="customSample" type="text">
      <button>Paragraph (enter own, random)</button>
      <button>Layout</button>
      <button>Table</button>
      <button @click="showJSON = !showJSON">Show JSON</button>
    </div>
    <div class="count">
      <p>{{ fontCount }}</p>
      
    </div>
    <main>
      <div v-for="font in filteredFonts" :key="key()">
        <div class="font" :style="{ fontFamily: font.family }">{{ sample(font.family) }}</div>
        <div><span v-for="variant in font.variants" :key="key()">{{ variant }}</span> <span v-if="customSample">{{ font.family }}</span></div>
        <small v-if="showJSON"><pre>{{ font }}</pre></small>
      </div>
    </main>
  </div>
</template>

<script>
import WebFont from 'webfontloader'
import flexFilter from './filter.js'

export default {
  name: 'App',
  data() {
    return {
      customSample: '',
      filters: {
        category: 'monospace'
        // variants: ['2'],
        // subsets: ['latin']
      },
      criteria: [
        { Field: 'category', Values: ['monospace'] },
        // { Field: 'variants', Values: ['700'] }
      ],
      googleFonts: [],
      loadedFonts: [],
      showJSON: false
    };
  },
  computed: {
    categories() {
      return new Set(this.googleFonts.map(font => font.category))
    },
    filteredFonts() {
      return this.googleFonts.filter(font => font.category == this.filters.category)
      // return this.googleFonts.flexFilter(this.criteria)
    },
    fontCount() {
      return this.filteredFonts.length
    }
  },
  methods: {
    sample(font) {
      return this.customSample || font
    },
    fetchGoogleFonts() {
      fetch(
        'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyC4LPtjlhXImnuIBnGbYCgwRLYoXDZ2i8c'
      )
      .then(response => response.json())
      .then(response => this.googleFonts = response.items)
    },
    key() {
      return Math.random() * (999 - 1) + 1
    },
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
};
</script>

<style>
  /*! minireset.css v0.0.4 | MIT License | github.com/jgthms/minireset.css */html,body,p,ol,ul,li,dl,dt,dd,blockquote,figure,fieldset,legend,textarea,pre,iframe,hr,h1,h2,h3,h4,h5,h6{margin:0;padding:0}h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:normal}ul{list-style:none}button,input,select,textarea{margin:0}html{box-sizing:border-box}*,*:before,*:after{box-sizing:inherit}img,embed,iframe,object,video{height:auto;max-width:100%}audio{max-width:100%}iframe{border:0}table{border-collapse:collapse;border-spacing:0}td,th{padding:0;text-align:left}
  body {
    margin: 0;
    font-family: Helvetica, Arial, sans-serif;
    font-size: 14px;
  }
  #app {
  }
  header {

  }
  .controls {
    position: sticky;
    top: 0;
    padding: 30px;
    background: white;
    border-bottom: 1px solid black;
  }
  ul {
    display: flex;
    list-style: none;
    padding: 20px 0 0 30px;
  }
  li {
    position: relative;
    padding: 0 0 3px 0;
    border: 1px solid transparent;
    cursor: pointer;
  }
  li + li { margin-left: 20px; }
  li.active {
    border-bottom: 2px solid black;
  }
  main {
    padding: 0 30px 30px;
  }
  .font {
    font-size: 40px;
    padding: 20px 0;
    border-top: 1px solid #e6e6e6;
  }
  small {
    font-size: 10px;
  }
</style>

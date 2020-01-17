import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    customSample: '',
    currentSpecimen: {},
    blacklisted: [
      // sans-serif
      'Aclonica',
      'Acme',
      'Advent Pro',
      'Alegreya Sans SC',
      'Amaranth',
      'Arsenal',
      'Arya',
      'Asul',
      'BenchNine',
      'Black And White Picture',
      'Changa',
      'Chathura',
      'Chau Philomene One',
      'Denk One',
      'Dhurjati',
      'Dosis',
      'Do Hyeon',
      'Dorsa',
      'Economica',
      'El Messiri',
      'Englebert',
      'Exo',
      'Exo 2',
      'Geo',
      'Hind',
      'Hind Guntur',
      'Hind Madurai',
      'Hind Siliguri',
      'Hind Vadodara',
      'Jura',
      'Kanit',
      'Khand',
      'Marvel',
      'Maven Pro',
      'Mitr',
      'Montserrat Subrayada',
      'Orbitron',
      'Philosopher',
      'Play',
      'Proza Libre',
      'Quantico',
      'Rajdhani',
      'Ropa Sans',
      'Ruda',
      'Sansita',
      'Sarpanch',
      'Syncopate',
      'Teko',
      'Titillium Web',
      'Yanone Kaffeesatz',
      // serif
      'Almendra',
      'Aref Ruqaa',
      'BioRhyme Expanded',
      'Cormorant Unicase',
      'Inknut Antiqua'
    ],
    categoryFilter: 'sans-serif',
    fontSample: 'SentenceSample',
    globalFontSize: 36,
    googleFonts: [],
    recommendedFonts: [
      // sans-serif
      'Archivo',
      'Archivo Narrow',
      'Asap',
      'Asap Condensed',
      'Bai Jamjuree',
      'Barlow',
      'Barlow Condensed',
      'Barlow Semi Condensed',
      'Be Vietnam',
      'Chivo',
      'DM Sans',
      'Exo 2',
      'Fira Sans',
      'Fira Sans Condensed',
      'Fira Sans Extra Condensed',
      'Gudea',
      'IBM Plex Sans',
      'IBM Plex Sans Condensed',
      'Karla',
      'Lato',
      'Lekton',
      'Libre Franklin',
      'M PLUS 1p',
      'M PLUS Rounded 1c',
      'Mada',
      'News Cycle',
      'Nunito',
      'Nunito Sans',
      'Open Sans',
      'Open Sans Condensed',
      'Oswald',
      'Pragati Narrow',
      'Public Sans',
      'Quattrocento Sans',
      'Quicksand',
      'Roboto',
      'Roboto Condensed',
      'Sarabun',
      'Source Sans Pro',
      'Work Sans',
      'Yantramanav',
      // serif
      'Abhaya Libre',
      'Adamina',
      'Aleo',
      'Alice',
      'Alike',
      'Alike Angular',
      'Amethysta',
      'Amiri',
      'Andada',
      'Arbutus Slab',
      'Asar',
      'Brawler',
      'Buenard',
      'Cambo',
      'Copse',
      'Crimson Pro',
      'Crimson Text',
      'Domine',
      'Donegal One',
      'Esteban',
      'Fjord One',
      'Gelasio',
      'IBM Plex Serif',
      'Petrona',
      'Solway',
      'Source Serif Pro',
      'Spectral',
      'Trocchi',
      'Zilla Slab'
    ],
    recommendedOnly: true,
    showJSON: false
  },
  getters: {
    getCategoryFilter(state) {
      return state.categoryFilter
    },
    getCurrentSpecimen(state) {
      return state.currentSpecimen
    },
    getCustomSample(state) {
      return state.customSample
    },
    getFontCategories(state, getters) {
      return [...new Set(getters.getGoogleFonts.map(font => font.category))]
    },
    getFontSample(state) {
      return state.fontSample
    },
    getGlobalFontSize(state) {
      return state.globalFontSize
    },
    getGoogleFonts(state) {
      return state.googleFonts
    },
    getLatinFonts(state, getters) {
      return getters.getGoogleFonts.filter(font => font.subsets.includes('latin'))
    },
    // main entrance in App.vue
    getFilteredFonts(state, getters) {
      return getters.getLatinFonts.filter(font => font.category == getters.getCategoryFilter)
    },
    getRecommendedFonts(state, getters) {
      let recommended = getters.getLatinFonts.filter(font => font.recommended)
      return recommended.filter(font => font.category == getters.getCategoryFilter)
    },
    getRecommendedOnly(state) {
      return state.recommendedOnly
    },
    getWhitelistedFonts(state, getters) {
      let whitelisted = []
      getters.getFilteredFonts.forEach(font => {
        if (!state.blacklisted.includes(font.family)) {
          whitelisted.push(font)
        }
      })
      return whitelisted
    },
    showJSON(state) {
      return state.showJSON
    }
  },
  mutations: {
    updateCurrentSpecimen(state, value) {
      state.currentSpecimen = value
    },
    updateCustomSample(state, value) {
      state.customSample = value
    },
    processGoogleFonts(state, fonts) {
      // add recommended tag
      let processedFonts = fonts
      processedFonts.forEach(font => {
        if (state.recommendedFonts.includes(font.family)) {
          font.recommended = true
        } else {
          font.recommended = false
        }
      })
      state.googleFonts = processedFonts
    },
    setCategoryFilter(state, value) {
      state.categoryFilter = value
    },
    setGoogleFonts(state, fonts) {
      state.googleFonts = fonts
    },
    setGlobalFontSize(state, value) {
      state.globalFontSize = value
    },
    setFontSample(state, value) {
      state.fontSample = value
    },
    toggleJSON(state) {
      state.showJSON = !state.showJSON
    },
    toggleRecommendedOnly(state) {
      state.recommendedOnly = !state.recommendedOnly
    }
  },
  actions: {
    updateCategoryFilter({ commit }, value) {
      commit('setCategoryFilter', value)
    },
    updateCurrentSpecimen({ commit }, value) {
      commit('updateCurrentSpecimen', value)
    },
    updateCustomSample({ commit }, value) {
      commit('updateCustomSample', value)
    },
    updateFontSample({ commit }, value) {
      commit('setFontSample', value)
    },
    updateGlobalFontSize({ commit }, value) {
      commit('setGlobalFontSize', value)
    },
    fetchGoogleFonts({ commit }) {
      fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyC4LPtjlhXImnuIBnGbYCgwRLYoXDZ2i8c')
        .then(response => response.json())
        // .then(response => commit('setGoogleFonts', response.items))
        .then(response => commit('processGoogleFonts', response.items))
    },
    toggleJSON({ commit }) {
      commit('toggleJSON')
    },
    toggleRecommendedOnly({ commit }) {
      commit('toggleRecommendedOnly')
    }
  }
});
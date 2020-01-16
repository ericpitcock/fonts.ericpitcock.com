import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    customSample: 'Enter your words',
    blacklisted: {
      sansSerif: [
        "Advent Pro",
        "Alegreya Sans SC",
        "Amaranth",
        "Arsenal",
        "Arya",
        "Asul",
        "BenchNine",
        "Changa",
        "Chathura",
        "Chau Philomene One",
        "Dosis",
        "Economica",
        "El Messiri",
        "Exo",
        "Exo 2",
        "Geo",
        "Hind",
        "Hind Guntur",
        "Hind Madurai",
        "Hind Siliguri",
        "Hind Vadodara",
        "Jura",
        "Kanit",
        "Khand",
        "Marvel",
        "Maven Pro",
        "Mitr",
        "Montserrat Subrayada",
        "Orbitron",
        "Philosopher",
        "Play",
        "Proza Libre",
        "Quantico",
        "Rajdhani",
        "Ropa Sans",
        "Ruda",
        "Sansita",
        "Sarpanch",
        "Syncopate",
        "Teko",
        "Titillium Web",
        "Yanone Kaffeesatz"
      ],
      serif: [
        "Almendra",
        "Aref Ruqaa",
        "BioRhyme Expanded",
        "Cormorant Unicase",
        "Inknut Antiqua"
      ]
    },
    categoryFilter: 'sans-serif',
    fontSample: 'FontNameSample',
    googleFonts: [],
    showJSON: false
  },
  getters: {
    getCategoryFilter(state) {
      return state.categoryFilter
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
    getGoogleFonts(state) {
      return state.googleFonts
    },
    getLatinFonts(state) {

    },
    getFilteredFonts(state, getters) {
      return getters.getGoogleFonts.filter(font => font.category == getters.getCategoryFilter)
    },
    showJSON(state) {
      return state.showJSON
    }
  },
  mutations: {
    updateCustomSample(state, value) {
      state.customSample = value
    },
    setCategoryFilter(state, value) {
      state.categoryFilter = value
    },
    setGoogleFonts(state, fonts) {
      state.googleFonts = fonts
    },
    setFontSample(state, value) {
      state.fontSample = value
    },
    toggleJSON(state) {
      state.showJSON = !state.showJSON
    }
  },
  actions: {
    updateCategoryFilter({ commit }, value) {
      commit('setCategoryFilter', value)
    },
    updateCustomSample({ commit }, value) {
      commit('updateCustomSample', value)
    },
    updateFontSample({ commit }, value) {
      commit('setFontSample', value)
    },
    fetchGoogleFonts({ commit }) {
      fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyC4LPtjlhXImnuIBnGbYCgwRLYoXDZ2i8c')
        .then(response => response.json())
        .then(response => commit('setGoogleFonts', response.items))
    },
    toggleJSON({ commit }) {
      commit('toggleJSON')
    }
  }
});
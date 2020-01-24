import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    compare: [],
    customSample: '',
    currentSpecimen: '',
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
    getActiveFonts(state, getters) {
      return (getters.getRecommendedOnly) ? getters.getRecommendedFonts : getters.getFilteredFonts
    },
    getCategoryFilter(state) {
      return state.categoryFilter
    },
    getCompare(state) {
      return state.compare
    },
    getCurrentSpecimen(state, getters) {
      return state.currentSpecimen
    },
    getCustomSample(state) {
      return state.customSample
    },
    getFontFromSlug: (state, getters) => (slug) => {
      let family = slug.replace('-', ' ').toUpperCase()
      console.log(`Slug: ${family}`)
      return getters.getFilteredFonts.filter(font => font.family.toUpperCase() != family)
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
    // main entrance in App.vue, includes recommended tag
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
    // getWhitelistedFonts(state, getters) {
    //   let whitelisted = []
    //   getters.getFilteredFonts.forEach(font => {
    //     if (!state.blacklisted.includes(font.family)) {
    //       whitelisted.push(font)
    //     }
    //   })
    //   return whitelisted
    // },
    showJSON(state) {
      return state.showJSON
    }
  },
  mutations: {
    clearCompare(state) {
      state.compare = []
    },
    processGoogleFonts(state, fonts) {
      // console.log(fonts)
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
    setCurrentSpecimen(state, fontFamily) {
      state.currentSpecimen = fontFamily
    },
    setCustomSample(state, value) {
      state.customSample = value
    },
    setFontSample(state, value) {
      state.fontSample = value
    },
    setGoogleFonts(state, fonts) {
      state.googleFonts = fonts
    },
    setGlobalFontSize(state, value) {
      state.globalFontSize = value
    },
    toggleJSON(state) {
      state.showJSON = !state.showJSON
    },
    toggleRecommendedOnly(state) {
      state.recommendedOnly = !state.recommendedOnly
    },
    updateCompare(state, font, inCompare) {
      if (state.compare.some(item => item.family == font.family)) {
        state.compare = state.compare.filter(item => item.family != font.family)
      } else {
        state.compare.push(font)
      }
    }
  },
  actions: {
    clearCompare({ commit }) {
      commit('clearCompare')
    },
    updateCategoryFilter({ commit }, value) {
      commit('setCategoryFilter', value)
    },
    updateCompare({ commit }, font) {
      commit('updateCompare', font)
    },
    updateCurrentSpecimen({ commit }, fontFamily) {
      // const fontObject = getters.getGoogleFonts.filter(font => font.family.toUpperCase() == fontFamily.toUpperCase())
      // console.log(getters.getGoogleFonts)
      // console.log(`fontObject: ${fontObject}`)
      commit('setCurrentSpecimen', fontFamily)
    },
    updateCustomSample({ commit }, value) {
      commit('setCustomSample', value)
    },
    updateFontSample({ commit }, value) {
      commit('setFontSample', value)
    },
    updateGlobalFontSize({ commit }, value) {
      commit('setGlobalFontSize', value)
    },
    async fetchGoogleFonts({ commit }) {
      // if (state.googleFonts.length > 0) {
      //   console.log('Returning: already have Google Fonts')
      //   return
      // } else {
      //   console.log('Fetched Google Fonts')
        const response = await fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyC4LPtjlhXImnuIBnGbYCgwRLYoXDZ2i8c')
          .then(response => response.json())
          .then(async response => await commit('processGoogleFonts', response.items))
      // }
    },
    async getMe({ getters, commit }) {
      const res = await API.GET(`/user/${getters.myId}`)
      return await commit('setMe', res.data)
    },
    // async fetchGoogleFonts({ commit, state }) {
    //   if (state.googleFonts.length > 0) {
    //     console.log('Returning: already have Google Fonts')
    //     return
    //   } else {
    //     console.log('Fetched Google Fonts')
    //     await fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyC4LPtjlhXImnuIBnGbYCgwRLYoXDZ2i8c')
    //       .then(response => response.json())
    //       .then(response => commit('processGoogleFonts', response.items))
    //   }
    // },
    toggleJSON({ commit }) {
      commit('toggleJSON')
    },
    toggleRecommendedOnly({ commit }) {
      commit('toggleRecommendedOnly')
    }
  }
})
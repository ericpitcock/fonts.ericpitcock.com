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
    // font arrays
    // getFilteredFonts(state, getters) {
    //   return (category, fonts) => {
    //     return getters.getLatinFonts.filter(font => font.category == category)
    //   }
    // },
    // getFilteredFonts(state, getters) {
    //   return getters.getLatinFonts.filter(font => font.category == getters.getCategoryFilter)
    // },
    getActiveFonts(state, getters) {
      const fontsByCategory = getters.getFontsByCategory(getters.getCategoryFilter)
      if (getters.getRecommendedOnly) {
        return fontsByCategory.filter(font => getters.getRecommendedFonts.includes(font.family))
      } else {
        return fontsByCategory
      }
    },
    getLatinFonts(state, getters) {
      return getters.getGoogleFonts.filter(font => font.subsets.includes('latin'))
    },
    getRecommendedFonts(state) {
      return state.recommendedFonts
    },
    getCategoryFilter(state) {
      return state.categoryFilter
    },
    getFonts(state, getters) {
      let fonts = []
      if (getters.recommendedOnly) {
        // return recommended fonts
        fonts = getters.getLatinFonts.filter(font => getters.getRecommendedFonts.includes(font.family))
      } else {
        // return all fonts
        fonts = getters.getLatinFonts
      }
      // now filter them based on category
      return fonts.filter(font => font.category == getters.getCategoryFilter)
    },
    getCompare(state) {
      return state.compare
    },
    getCurrentSpecimen(state, getters) {
      return getters.getActiveFonts.find(font => font.family.toUpperCase() == state.currentSpecimen.toUpperCase())
    },
    getCustomSample(state) {
      return state.customSample
    },
    // getFontFromSlug: (state, getters) => (slug) => {
    //   let family = slug.replace('-', ' ').toUpperCase()
    //   console.log(`Slug: ${family}`)
    //   return getters.getFilteredFonts.filter(font => font.family.toUpperCase() != family)
    // },
    // getFontFromSlug(state, getters) {
    //   return (slug) => {
    //     let family = slug.replace('-', ' ').toUpperCase()
    //     console.log(`Slug: ${family}`)
    //     return getters.getFilteredFonts.find(font => font.family.toUpperCase() != family)
    //   }
    // },
    getFontFromSlug: (state, getters) => (slug) => {
      let family = slug.replace('-', ' ').toUpperCase()
      console.log(`Slug: ${family}`)
      return state.googleFonts.find(font => font.family == slug)
    },
    getFontCategories(state, getters) {
      return [...new Set(getters.getGoogleFonts.map(font => font.category))]
    },
    getFontCount(state, getters) {
      return getters.getActiveFonts.length
    },
    getFontSample(state) {
      return state.fontSample
    },
    // getFontsByCategory(state) {
    //   return getters.getLatinFonts.filter(font => font.category == getters.getCategoryFilter)
    // },
    getFontsByCategory(state, getters) {
      return (category) => {
        return getters.getLatinFonts.filter(font => font.category == category)
      }
    },
    getGlobalFontSize(state) {
      return state.globalFontSize
    },
    getGoogleFonts(state) {
      return state.googleFonts
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
    setGoogleFonts(state, fonts) {
      state.googleFonts = fonts
    },
    // processGoogleFonts(state, fonts) {
    //   let items = Promise.resolve(fonts)
    //   items.then(response => response.json().then(response => {
    //     let processedFonts = response.items
    //     processedFonts.forEach(font => {
    //       font.recommended = (state.recommendedFonts.includes(font.family))
    //     })
    //     // state.googleFonts = processedFonts
    //     Vue.set(state, 'googleFonts', processedFonts)
    //   }))
    // },
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
    updateCurrentSpecimen({ commit, getters }, fontFamily) {
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
      try {
        const response = await fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${process.env.VUE_APP_GOOGLE_FONTS_API_KEY}`)
        
        if (!response.ok) {
          throw new Error(`Failed to fetch Google Fonts. Status: ${response.status}`)
        }

        const data = await response.json()
        commit('setGoogleFonts', data.items)
      } catch (error) {
        console.error('Error fetching Google Fonts:', error)
        throw error
      }
    },
    toggleJSON({ commit }) {
      commit('toggleJSON')
    },
    toggleRecommendedOnly({ commit }) {
      commit('toggleRecommendedOnly')
    }
  }
})
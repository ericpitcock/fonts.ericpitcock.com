import { createStore } from 'vuex'

export default createStore({
  state: {
    filters: {
      category: 'sans-serif',
      italics: false,
      multipleWeights: false,
      recommended: false,
    },
    filtersDefault: {
      category: 'sans-serif',
      italics: false,
      multipleWeights: false,
      recommended: false,
    },
    compare: [],
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
      'Inter',
      'Inter Tight',
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
      'Schibsted Grotesk',
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
      'Zilla Slab',
      // handwriting
      'Meow Script',
      'Ms Madi',
      'Sacramento',
      // monospace
      'Anonymous Pro',
      'DM Mono',
      'Fira Code',
      'Fire Mono',
      'Fragment Mono',
      'IBM Plex Mono',
      'Inconsolata',
      'Roboto Mono',
      // display
      'Agbalumo',
      'Bokor',
      'Calistoga',
      'Caprasimo',
      'Miniver',
      'Orelega One',
      'Zen Tokyo Zoo',
    ],
    // recommendedOnly: false,
    sentenceSample: 'The quick brown fox jumps over the lazy dog.',
    sentenceSampleDefault: 'The quick brown fox jumps over the lazy dog.',
    showJSON: false,
    theme: 'light',
    weightMap: {
      '100': 'Thin',
      '200': 'Extra Light',
      '300': 'Light',
      'regular': 'Regular',
      '500': 'Medium',
      '600': 'Semi Bold',
      '700': 'Bold',
      '800': 'Extra Bold',
      '900': 'Black',
    }
  },
  getters: {
    getActiveFonts(state, getters) {
      let activeFonts = getters.getFontsByCategory(getters.getCategoryFilter)

      // Apply recommended fonts filter
      if (state.filters.recommended) {
        activeFonts = activeFonts.filter(font => getters.getRecommendedFonts.includes(font.family))
      }

      // if fitlers.italics, filter out the non-italic variants
      if (state.filters.italics) {
        activeFonts = activeFonts.filter(font => font.variants.includes('italic'))
      }

      // if multipleWeights, filter out the fonts with only one weight
      if (state.filters.multipleWeights) {
        activeFonts = activeFonts.filter(font => font.variants.length > 1)
        // if there are 2 variants and one of them is italic, filter it out
        activeFonts = activeFonts.filter(font => !(font.variants.length == 2 && font.variants.includes('italic')))
      }

      return activeFonts
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
    getFilters(state) {
      return state.filters
    },
    getCompare(state) {
      return state.compare
    },
    getCurrentSpecimen(state, getters) {
      return getters.getActiveFonts.find(font => font.family.toUpperCase() == state.currentSpecimen.toUpperCase())
    },
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
    getItalicsOnly(state) {
      return state.filters.italics
    },
    // getSentenceSample(state) {
    //   return state.sentenceSample
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
    setCategoryFilter(state, value) {
      state.categoryFilter = value
    },
    setCurrentSpecimen(state, fontFamily) {
      state.currentSpecimen = fontFamily
    },
    setFilters(state, value = {}) {
      // if value is empty, reset to default
      if (Object.keys(value).length === 0) {
        // change all but category to false
        for (let key in state.filters) {
          if (key != 'category') {
            state.filters[key] = false
          }
        }
        return
      }
      for (let key in value) {
        state.filters[key] = value[key]
      }
    },
    // setFontSample(state, value) {
    //   state.fontSample = value
    // },
    setGlobalFontSize(state, value) {
      state.globalFontSize = value
    },
    setSentenceSample(state, value) {
      state.sentenceSample = value
    },
    setTheme: (state, data) => {
      state.theme = data
    },
    toggleJSON(state) {
      state.showJSON = !state.showJSON
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
    // updateFilters({ commit }, value) {
    //   // console.log('Updating filters:', value)
    //   commit('setFilters', value)
    // },
    // updateFontSample({ commit }, value) {
    //   commit('setFontSample', value)
    // },
    // updateGlobalFontSize({ commit }, value) {
    //   commit('setGlobalFontSize', value)
    // },

    // updateSentenceSample({ commit }, value) {
    //   commit('setSentenceSample', value)
    // },
    // toggleJSON({ commit }) {
    //   commit('toggleJSON')
    // },
    // keep
    async fetchGoogleFonts({ commit }) {
      try {
        const response = await fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${import.meta.env.VITE_GOOGLE_FONTS_API_KEY}`)

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
    toggleTheme: ({ state, commit }) => {
      let newTheme = state.theme == 'dark' ? 'light' : 'dark'
      document.documentElement.setAttribute('data-color-theme', newTheme)
      commit('setTheme', newTheme)
    },
  }
})
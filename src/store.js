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
    currentSpecimen: {},
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
      let activeFonts = getters.getFontsByCategory(state.categoryFilter)

      // Apply recommended fonts filter
      if (state.filters.recommended) {
        activeFonts = activeFonts.filter(font => state.recommendedFonts.includes(font.family))
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
    getLatinFonts(state) {
      return state.googleFonts.filter(font => font.subsets.includes('latin'))
    },
    // getRecommendedFonts(state) {
    //   return state.recommendedFonts
    // },
    // getCategoryFilter(state) {
    //   return state.categoryFilter
    // },
    // getFilters(state) {
    //   return state.filters
    // },
    getCurrentSpecimen(state, getters) {
      return getters.getActiveFonts.find(font => font.family.toUpperCase() == state.currentSpecimen.toUpperCase())
    },
    getFontBySlug: (state) => (slug) => {
      return state.googleFonts.find(
        font => font.family.toLowerCase().replace(/\s+/g, '-') === slug
      )
    },
    getFontCategories(state) {
      return [...new Set(state.googleFonts.map(font => font.category))]
    },
    getFontCount(state, getters) {
      return getters.getActiveFonts.length
    },
    // getFontSample(state) {
    //   return state.fontSample
    // },
    getFontsByCategory(state, getters) {
      return (category) => {
        return getters.getLatinFonts.filter(font => font.category == category)
      }
    },
    // getGlobalFontSize(state) {
    //   return state.globalFontSize
    // },
    // getGoogleFonts(state) {
    //   return state.googleFonts
    // },
    // getItalicsOnly(state) {
    //   return state.filters.italics
    // },
  },
  mutations: {
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
      if (Object.keys(value).length === 0) {
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
  },
  actions: {
    async fetchGoogleFonts({ commit }) {
      console.log('fetching google fonts')
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
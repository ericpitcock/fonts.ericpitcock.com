import { createStore } from 'vuex'

const defaultFilters = {
  category: 'sans-serif',
  italics: false,
  multipleWeights: false,
  recommended: true,
}

export default createStore({
  state: {
    filters: { ...defaultFilters },
    currentSpecimen: {},
    categoryFilter: 'sans-serif',
    fontSample: 'SentenceSample',
    globalFontSize: 36,
    googleFonts: [],
    headlines: [
      'Breaking news just got louder and harder to ignore',
      'Silence can echo louder than a thousand voices',
      'Midnight whispers travel through empty concrete streets',
      'Dream bigger, work smarter, and trust the process',
      'Design like you mean it, then refine it again',
      'When in doubt, add whitespace and breathe again',
      'A storm is coming, but the grid will hold',
      'Good fonts make great impressions that actually last',
      'Welcome to the future of type, built for today',
      'Every pixel counts when words are the message',
      'Less noise, more meaning — always choose clarity',
      'Think bold thoughts and speak with sharp design',
      'Built to last, made to move with purpose',
      'Chaos meets clarity in beautifully structured letters',
      'These letters weren’t just made — they were crafted',
      'Inspiration begins with a line, but never ends',
      'Typography is the voice your message deserves to have',
      'Serifs speak softly, sans-serifs shout with confidence',
      'The grid brings structure to creative chaos',
      'Elegance meets utility in every corner and curve',
      'Not just words — but rhythm, tone, and motion',
      'Readable at any size, stunning at every weight',
      'Modern forms shaped by timeless design principles',
      'Speak softly, but always choose the right font',
      'A typeface can tell the whole story, beautifully',
      'Beauty lives in the space between the letters',
      'Geometry meets emotion in this expressive display face',
      'Letters can move people when designed with care',
      'The art of letters is alive and evolving',
      'Form and function meet where stories begin'
    ],
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
    theme: 'dark',
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
    getFontsByCategory(state, getters) {
      return (category) => {
        return getters.getLatinFonts.filter(font => font.category == category)
      }
    },
  },
  mutations: {
    resetFilters(state) {
      state.filters = { ...defaultFilters }
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
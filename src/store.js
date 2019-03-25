import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    googleFonts: [],
    filters: {
      category: 'monospace'
    }
  },
  getters: {
    googleFonts(state) {
      return state.googleFonts
    },
    filteredFonts(state) {
      return state.googleFonts.filter(font => font.category == state.filters.category)
    },
    fontCount(state, getters) {
      return getters.filteredFonts.length
    }
  },
  mutations: {

  },
  actions: {

  }
})

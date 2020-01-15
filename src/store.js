import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    customSample: '',
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
    }
  },
  getters: {
    getCustomSample(state) {
      return state.customSample
    }
  },
  mutations: {
    updateCustomSample(state, value) {
      state.customSample = value
    }
  },
  actions: {
    updateCustomSample({ commit }, value) {
      commit("updateCustomSample", value)
    }
  }
});

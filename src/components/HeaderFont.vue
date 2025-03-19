<template>
  <header>
    <div>Font header</div>
    <router-link to="/">Back to index</router-link>
  </header>
</template>

<script setup>
  import { computed, ref } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()

  const samples = ref([
    {
      name: 'Sentence',
      component: 'SentenceSample'
    },
    {
      name: 'Alphabet',
      component: 'AlphabetSample'
    },
    {
      name: 'Paragraph',
      component: 'ParagraphSample'
    }
  ])

  const getActiveFonts = computed(() => store.getters.getActiveFonts)
  const getCategoryFilter = computed(() => store.getters.getCategoryFilter)
  const getFontCategories = computed(() => store.getters.getFontCategories)
  const getFontSample = computed(() => store.getters.getFontSample)
  // const getRecommendedOnly = computed(() => store.getters.getRecommendedOnly)
  const getSentenceSample = computed(() => store.getters.getSentenceSample)

  const customSample = computed({
    get() {
      return store.getters.getSentenceSample
    },
    set(value) {
      store.dispatch('updateSentenceSample', value)
    }
  })

  // Note: getGlobalFontSize is not in the mapGetters but is used in fontSize computed property
  // Added it assuming it should be there
  const getGlobalFontSize = computed(() => store.getters.getGlobalFontSize)

  const fontSize = computed({
    get() {
      return store.getters.getGlobalFontSize
    },
    set(value) {
      store.dispatch('updateGlobalFontSize', value)
    }
  })

  // Commented methods
  // const customFocus = () => {
  //   store.dispatch('updateFontSample', 'CustomSample')
  // }
</script>

<style lang="scss" scoped>
  header {
    // option for sticky header
    position: sticky;
    top: 0;
    z-index: 1;
    // end option
    grid-row: 1;
    grid-column: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;
    background: white;
    border-bottom: 1px solid #d3d3d3;
    flex: 0 0 auto;
  }
</style>
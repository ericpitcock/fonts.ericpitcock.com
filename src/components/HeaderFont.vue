<template>
  <header>
    <div>Font header</div>
    <router-link to="/">Back to index</router-link>
  </header>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Header',
    data() {
      return {
        samples: [
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
        ]
      }
    },
    computed: {
      ...mapGetters([
        'getActiveFonts',
        'getCategoryFilter',
        'getFontCategories',
        'getFontSample',
        'getRecommendedOnly'
      ]),
      customSample: {
        get() {
          return this.getCustomSample
        },
        set(value) {
          this.$store.dispatch('updateCustomSample', value)
        }
      },
      fontSize: {
        get() {
          return this.getGlobalFontSize
        },
        set(value) {
          this.$store.dispatch('updateGlobalFontSize', value)
        }
      }
    },
    methods: {
      customFocus() {
        this.$store.dispatch('updateFontSample', 'CustomSample')
      }
    }
  }
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
<template>
  <div
    :id="font.family.toLowerCase().split(' ').join('-')"
    class="font-container">
    <div class="font">
      <div class="font__sample">
        <div v-if="loading" class="loading">
          <img src="/img/loading.svg" alt="loading">
        </div>
        <div v-if="error" class="error">
          <p>There was an error loading this font</p>
        </div>
        <component
          v-if="!loading && !error"
          :is="getFontSample"
          :style="{ fontFamily: font.family, fontSize: `${getGlobalFontSize}px` }" />
      </div>
      <FontInfo :font="font" />
      <div class="json" v-if="showJSON">
        <pre>{{ font }}</pre>
      </div>
      <!-- <div class="font__compare-button" @click="compare(font)">
        {{ compareLabel(font) }}
      </div> -->
    </div>
  </div>
</template>

<script>
  import AlphabetSample from '@/components/samples/AlphabetSample'
  import SentenceSample from '@/components/samples/SentenceSample'
  import ParagraphSample from '@/components/samples/ParagraphSample'
  import TableSample from '@/components/samples/TableSample'
  import FontInfo from '@/components/FontInfo'
  import { mapGetters } from 'vuex'
  import WebFont from 'webfontloader'

  export default {
    name: 'FontContainer',
    props: ['font'],
    components: {
      AlphabetSample,
      FontInfo,
      SentenceSample,
      ParagraphSample,
      TableSample
    },
    data() {
      return {
        // fontSample: 'FontNameSample',
        inCompare: false,
        loading: true,
        error: false,
        observer: null
      }
    },
    computed: {
      ...mapGetters([
        'getCategoryFilter',
        'getCompare',
        // 'getFilteredFonts',
        // 'getFontCategories',
        'getFontSample',
        'getGlobalFontSize',
        'getRecommendedOnly',
        'showJSON'
        // 'getGoogleFonts'
      ])
    },
    methods: {
      compare(font) {
        this.$store.dispatch('updateCompare', font)
      },
      compareLabel(font) {
        return (this.getCompare.some(item => item.family == font.family)) ? 'Remove' : 'Compare'
      },
      loadFont(font) {
        // https://www.npmjs.com/package/webfontloader
        let fontStack = ''
        if (font.variants.length > 1) {
          fontStack = `${font.family}:${font.variants.join(',')}`
        } else {
          fontStack = font.family
        }
        // console.log([fontStack])
        WebFont.load({
          google: {
            //families: ['Open Sans:300,400,700']
            families: [fontStack]
          },
          classes: false,
          loading: () => {
          },
          active: () => {
          },
          inactive: () => {
          },
          fontloading: (familyName, fvd) => {
            this.loading = true
            // console.log(`fontloading: ${familyName}`)
          },
          fontactive: (familyName, fvd) => {
            this.loading = false
            // console.log(`fontactive: ${familyName}`)
          },
          fontinactive: (familyName, fvd) => {
            this.loading = false
            this.error = true
            // console.log(`fontinactive: ${familyName}`)
          }
        })
      },
      // toFontSpecimen(font) {
      //   // populate store and route
      //   this.$store.dispatch('updateCurrentSpecimen', font.family)
      //   this.$router.push({ path: `/${font.family.toLowerCase().split(' ').join('-')}` })
      // }
    },
    watch: {
      getCategoryFilter: function() {
        this.observer.observe(this.$el)
      },
      getCompare: function() {

      },
      getRecommendedOnly: function() {
        this.observer.observe(this.$el)
      }
    },
    mounted() {
      // https://alligator.io/vuejs/lazy-image/
      this.observer = new IntersectionObserver(entries => {
        const container = entries[0]
        if (container.isIntersecting) {
          this.loadFont(this.font)
          this.observer.disconnect()
        }
      }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.25
      })
      this.observer.observe(this.$el)
    },
    destroyed() {
      this.observer.disconnect()
    }
  }
</script>

<style lang="scss" scoped>
  .font-container {
    position: relative;

    .loading {
      position: absolute;
      top: 1px;
      right: 0;
      bottom: 0;
      left: 0;
      display: flex;
      align-items: center;
    }

    .loading img {
      height: 20px;
    }

    .error {
      display: flex;
      align-items: center;
      color: red;
    }
  }

  .font-container a {
    color: black;
    text-decoration: none;
  }

  .font {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 30px 60px;

    &:hover {
      // cursor: pointer;
    }

    &__sample {
      position: relative;
      flex: 1 1 auto;
      align-self: stretch;
      display: flex;
      flex-direction: column;
      gap: 20px;
      color: hsl(0, 0%, 20%);

      &:hover {
        cursor: pointer;
      }

      .json {
        padding-top: 30px;
        font-size: 12px;
      }
    }

    &__compare-button {
      display: flex;
      align-items: center;
      display: flex;
      align-items: center;
      font-size: 11px;
      border-radius: 15px;
      color: red;

      &:hover {
        color: black;
        // cursor: pointer;
      }
    }
  }
</style>
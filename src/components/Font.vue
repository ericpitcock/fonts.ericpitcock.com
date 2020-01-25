<template>
  <div
    :id="font.family.toLowerCase().split(' ').join('-')"
    class="font"
  >
    <div
      class="font__content"
      @click="toFontSpecimen(font)"
    >
      <FontInfo :font="font" />
      <div v-if="loading" class="font__content--loading">
        <img src="/img/loading.gif" alt="loading">
      </div>
      <div v-if="error" class="font__content--error">
        <p>There was an error loading this font</p>
        <div class="button">Retry</div>
      </div>
      <transition name="fade">
        <div
          v-if="!getGlobalLoading && !loading && !error"
          class="font__content--sample"
          :style="{ fontFamily: font.family, fontSize: `${getGlobalFontSize}px` }"
        >
          <component :is="getFontSample" />
          <div class="json" v-if="showJSON">
            <pre>{{ font }}</pre>
          </div>
        </div>
      </transition>
    </div>
    <div class="button" @click="compare(font)">{{ compareLabel(font) }}</div>
  </div>
</template>

<script>
  import AlphabetSample from '@/components/samples/AlphabetSample'
  import CustomSample from '@/components/samples/CustomSample'
  import SentenceSample from '@/components/samples/SentenceSample'
  import ParagraphSample from '@/components/samples/ParagraphSample'
  import TableSample from '@/components/samples/TableSample'
  import FontInfo from '@/components/FontInfo'
  import { mapGetters } from 'vuex'
  import WebFont from 'webfontloader'

  export default {
    name: 'Font',
    props: ['font'],
    components: {
      AlphabetSample,
      CustomSample,
      FontInfo,
      SentenceSample,
      ParagraphSample,
      TableSample
    },
    data() {
      return {
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
        'getFontSample',
        'getGlobalFontSize',
        'getGlobalLoading',
        'getRecommendedOnly',
        'showJSON'
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
        // FONTSTACK FOR ALL WEIGHTS
        // let fontStack = ''
        // if (font.variants.length > 1) {
        //   fontStack = `${font.family}:${font.variants.join(',')}`
        // } else {
        //   fontStack = font.family
        // }
        // console.log([fontStack])
        // FONTSTACK FOR FIRST WEIGHT
        let fontStack = `${font.family}:${font.variants[0]}`
        console.log([fontStack])
        WebFont.load({
          google: {
            //families: ['Open Sans:300,400,700']
            // families: [fontStack]
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
            this.$store.dispatch('updateGlobalLoading', false)
            // console.log(`fontactive: ${familyName}`)
          },
          fontinactive: (familyName, fvd) => {
            this.loading = false
            this.error = true
            // console.log(`fontinactive: ${familyName}`)
          }
        })
      },
      toFontSpecimen(font) {
        // populate store and route
        // this.$store.dispatch('updateCurrentSpecimen', font.family)
        this.$router.push({ path: `/${font.family.toLowerCase().split(' ').join('-')}` })
      }
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
      },{
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
  .font {
    position: relative;
    display: flex;
    align-items: center;
    // padding: 30px;
    border: 1px solid transparent;
    border-bottom: 1px solid #e6e6e6;
    & + & {
      margin-top: -1px;
    }
  }
  .font__content {
    flex: 1 1 auto;
    display: flex;
    padding: 30px;
    cursor: pointer;
    &--sample {
      flex: 1 1 auto;
      align-self: center;
      .json {
        padding-top: 30px;
        font-size: 12px;
      }
    }
    &--loading, &--error {
      position: absolute;
      top: 1px;
      right: 0;
      bottom: 0;
      left: 200px;
      padding-right: 200px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: white;
    }
    &--loading img {
      height: 100%;
    }
    &--error {
      display: flex;
      flex-direction: column;
      color: red;
      .button {
        margin-top: 20px;
      }
    }
  }
</style>
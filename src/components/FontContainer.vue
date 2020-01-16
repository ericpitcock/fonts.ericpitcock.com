<template>
  <div class="font-container">
    <div v-if=loading class="loading">
      <img src="/img/loading.gif" alt="loading">
    </div>
    <div v-if=error class="error">
      <p>There was an error loading this font</p>
    </div>
    <div class="font">
      <div class="left">
        <div class="font__name">
          <span>{{ font.family }}</span>
        </div>
        <div class="font__info">
          <span>{{ fontInfo(font) }}</span>
        </div>
      </div>
      <div
        class="font__sample"
        :style="{ fontFamily: font.family }"
      >
        <component :is="getFontSample" />
      </div>
      <small v-if="showJSON">
        <pre>{{ font }}</pre>
      </small>
    </div>
  </div>
</template>

<script>
  import AlphabetSample from '@/components/samples/AlphabetSample'
  import CustomSample from '@/components/samples/CustomSample'
  import FontNameSample from '@/components/samples/FontNameSample'
  import ParagraphSample from '@/components/samples/ParagraphSample'
  import TableSample from '@/components/samples/TableSample'
  import { mapGetters } from 'vuex'
  import WebFont from 'webfontloader'

  export default {
    name: 'FontContainer',
    props: ['font'],
    components: {
      AlphabetSample,
      CustomSample,
      FontNameSample,
      ParagraphSample,
      TableSample
    },
    data() {
      return {
        // fontSample: 'FontNameSample',
        loading: true,
        error: false,
        observer: null
      }
    },
    computed: {
      ...mapGetters([
        'getCategoryFilter',
        // 'getFilteredFonts',
        // 'getFontCategories',
        'getFontSample',
        'showJSON'
        // 'getGoogleFonts'
      ])
    },
    methods: {
      fontInfo(font) {
        let label = font.variants.length > 1 ? 'weights' : 'weight'
        // if it doesn't have italics
        if (!font.variants.includes('italic')) {
          return `${font.variants.length} ${label}`
        } else {
          let italicCount = 0
          font.variants.forEach(variant => {
            if (variant.includes('italic')) { italicCount++ }
          })
          return `${font.variants.length - italicCount} ${label} w/ italics`
        }
      },
      loadFont(font) {
        // let fontStack = `${font.family}:${font.variants.join(', ')}`
        let fontStack = ''
        if (font.variants.length > 1) {
          fontStack = `${font.family}:${font.variants.join(',')}`
        } else {
          fontStack = font.family
        }
        console.log([fontStack])
        WebFont.load({
          google: {
            //families: ['Open Sans:300,400,700']
            families: [fontStack]
          },
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
        });
      }
    },
    watch: {
      getCategoryFilter: function() {
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
  .font-container {
    position: relative;
    overflow: hidden;
    .loading, .error {
      position: absolute;
      top: 1px;
      right: 0;
      bottom: 0;
      left: 200px;
      padding-right: 200px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #fff;
    }
    .error {
      color: red;
    }
  }
  .font {
    display: flex;
    padding: 60px 20px;
    border-top: 1px solid #e6e6e6;
    border-bottom: 1px solid #e6e6e6;
    &:hover {
      cursor: pointer;
    }
    & + & {
      margin-top: -1px;
    }
    .left {
      flex: 0 0 200px;
    }
    &__name {
      flex: 0 0 30px;
      display: flex;
      align-items: center;
      color: blue;
    }
    &__sample {
      flex: 1 1 auto;
    }
    &__info {
      flex: 0 0 30px;
      display: flex;
      align-items: center;
      color: gray;
    }
  }
</style>
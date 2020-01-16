<template>
  <div ref="fontContainer" class="font-container">
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
      <!-- <small v-if="showJSON">
        <pre>{{ font }}</pre>
      </small> -->
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
        observer: null
      }
    },
    computed: {
      ...mapGetters([
        // 'getCategoryFilter',
        // 'getFilteredFonts',
        // 'getFontCategories',
        'getFontSample'
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
          return `${font.variants.length / 2} ${label} w/ italics`
        }
      },
      loadFont(font) {
        WebFont.load({
          google: {
            families: [font]
          },
          loading: function() {
            this.fontsLoaded = false
          },
          active: function() {
            this.fontsLoaded = true
          },
          inactive: function() {
            this.fontsLoaded = false
          },
          fontloading: function(familyName, fvd) {
            this.fontsLoaded = false
          },
          fontactive: function(familyName, fvd) {
            this.fontsLoaded = true
          },
          fontinactive: function(familyName, fvd) {
            this.fontsLoaded = false
          }
        });
      }
    },
    mounted() {
      // https://alligator.io/vuejs/lazy-image/
      this.observer = new IntersectionObserver(entries => {
        const container = entries[0]
        if (container.isIntersecting) {
          console.log(this.font.family)
          this.loadFont(this.font.family)
          this.observer.disconnect()
        }
      },{
        root: null,
        rootMargin: '0px',
        threshold: 0.5
      })
      this.observer.observe(this.$refs.fontContainer)
    },
    destroyed() {
      this.observer.disconnect()
    }
  }
</script>

<style lang="scss" scoped>
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
<template>
  <div class="index">
    <Compare v-if="getCompare.length >= 1" />
    <div class="container">
      <div class="content">
        <template v-if="getFonts.length == 0">
          <div class="no-results">No results found</div>
        </template>

        <template v-for="(font, index) in getFonts">
          <FontContainer
            :key="index"
            :font="font"
            v-if="visibility(font)"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import Compare from '@/components/Compare'
  import FontContainer from '@/components/FontContainer'
  import { mapGetters } from 'vuex'

  export default {
    name: 'Index',
    components: {
      Compare,
      FontContainer
    },
    computed: {
      ...mapGetters([
        // 'getActiveFonts',
        // 'getCategoryFilter',
        'getCompare',
        // 'getGoogleFonts',
        'getRecommendedOnly',
        'getRecommendedFonts',
        'getFonts'
      ]),
      // hasActiveFonts() {
      //   return this.getFonts.length > 0
      // },
      // activeFonts() {
      //   return this.$store.getters.getFontsByCategory(this.getCategoryFilter)
      // }
    },
    methods: {
      visibility(font) {
        if (this.getRecommendedOnly) {
          return this.getRecommendedFonts.includes(font.family)
        } else {
          return true
        }
      }
    },
    mounted() {
      console.log(this.getFonts.length)
    }
  }
</script>

<style lang="scss">
  .index {
    display: flex;
    flex-direction: column;
    align-items: center;

    & > .container .content {
      padding: 30px 0 100px 0;
    }
  }
</style>

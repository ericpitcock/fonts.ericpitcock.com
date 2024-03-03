<template>
  <div class="index">
    <Compare v-if="getCompare.length >= 1" />
    <div class="container">
      <div class="content">
        <template v-if="getActiveFonts.length == 0">
          <div class="no-results">No results found, try <span
              @click="toggleRecommendedOnly"
            >
              turning off recommendedations</span>
          </div>
        </template>

        <template v-for="(font, index) in getActiveFonts">
          <FontContainer
            :key="index"
            :font="font"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import Compare from '@/components/Compare'
  import FontContainer from '@/components/FontContainer'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'Index',
    components: {
      Compare,
      FontContainer
    },
    computed: {
      ...mapGetters([
        'getActiveFonts',
        // 'getCategoryFilter',
        'getCompare',
        // 'getGoogleFonts',
        'getFontsByCategory',
        'getRecommendedOnly',
        'getRecommendedFonts',
        'getFonts'
      ]),
      // hasActiveFonts() {
      //   return this.getFonts.length > 0
      // },
      // activeFonts() {
      //   const fontsByCategory = this.getFontsByCategory(this.getCategoryFilter)
      //   if (this.getRecommendedOnly) {
      //     return fontsByCategory.filter(font => this.getRecommendedFonts.includes(font.family))
      //   } else {
      //     return fontsByCategory
      //   }
      // },
    },
    methods: {
      ...mapActions([
        'toggleRecommendedOnly'
      ])
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

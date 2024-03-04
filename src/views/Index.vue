<template>
  <div class="index">
    <SampleControl />
    <Compare v-if="getCompare.length >= 1" />
    <div class="container">
      <div class="content">
        <template v-if="getActiveFonts.length == 0">
          <div class="no-results">No results found, try <span
              @click="toggleRecommendedOnly">
              turning off recommendedations</span>
          </div>
        </template>
        <FontContainer
          v-for="(font, index) in getActiveFonts"
          :key="index"
          :font="font"
          v-if="!fontIsInCompare(font.family)" />
      </div>
    </div>
  </div>
</template>

<script>
  import Compare from '@/components/Compare'
  import FontContainer from '@/components/FontContainer'
  import SampleControl from '@/components/SampleControl'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'Index',
    components: {
      Compare,
      FontContainer,
      SampleControl,
    },
    computed: {
      ...mapGetters([
        'getActiveFonts',
        'getCompare',
        'getFontsByCategory',
        'getRecommendedOnly',
        'getRecommendedFonts',
        'getFonts'
      ]),
    },
    methods: {
      ...mapActions([
        'toggleRecommendedOnly'
      ]),
      fontIsInCompare(fontFamily) {
        return this.getCompare.some(font => font.family === fontFamily)
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

    // align-items: center;
    & > .container .content {
      padding-bottom: 200px;
    }
  }
</style>

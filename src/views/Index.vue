<template>
  <div class="index">
    <SampleControl />
    <Compare v-if="getCompare.length >= 1" />
    <div class="container">
      <div class="content">
        <template v-if="getActiveFonts.length == 0">
          <div class="no-results">No fonts found. Try
            <span @click="$store.dispatch('updateFilters')">
              removing all filters.
            </span>
          </div>
        </template>
        <FontContainer
          v-for="(font, index) in getActiveFonts"
          :key="index"
          :font="font"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  import Compare from '@/components/Compare.vue'
  import FontContainer from '@/components/FontContainer.vue'
  import SampleControl from '@/components/SampleControl.vue'

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
        // 'getRecommendedOnly',
        // 'getRecommendedFonts',
        // 'getFonts'
      ]),
    },
    methods: {
      // ...mapActions([
      //   'toggleRecommendedOnly'
      // ]),
      // return all fonts from getActiveFonts that are not in getCompare
      getActiveFontsNotInCompare() {
        return this.getActiveFonts.filter(font => !this.fontIsInCompare(font.family))
      },
      fontIsInCompare(fontFamily) {
        return this.getCompare.some(font => font.family === fontFamily)
      }
    },
    watch: {
      getActiveFonts() {
        window.scrollTo(0, 0)
      }
    },
  }
</script>

<style lang="scss">
  .index {
    display: flex;
    flex-direction: column;

    // align-items: center;
    & > .container .content {
      padding: 40px 0 200px 0;
    }

    .no-results {
      padding: 30px 60px;
      // text-align: center;
      font-size: 1.5em;

      span {
        color: #007bff;
        cursor: pointer;
      }
    }
  }
</style>

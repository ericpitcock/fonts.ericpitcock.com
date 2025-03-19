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

<script setup>
  import { computed, watch } from 'vue'
  import { useStore } from 'vuex'

  import Compare from '@/components/Compare.vue'
  import FontContainer from '@/components/FontContainer.vue'
  import SampleControl from '@/components/SampleControl.vue'

  // Store access
  const store = useStore()

  // Getters
  const getActiveFonts = computed(() => store.getters.getActiveFonts)
  const getCompare = computed(() => store.getters.getCompare)
  const getFontsByCategory = computed(() => store.getters.getFontsByCategory)
  // const getRecommendedOnly = computed(() => store.getters.getRecommendedOnly)
  // const getRecommendedFonts = computed(() => store.getters.getRecommendedFonts)
  // const getFonts = computed(() => store.getters.getFonts)

  // Methods
  // const toggleRecommendedOnly = () => {
  //   store.dispatch('toggleRecommendedOnly')
  // }

  const getActiveFontsNotInCompare = () => {
    return getActiveFonts.value.filter(font => !fontIsInCompare(font.family))
  }

  const fontIsInCompare = (fontFamily) => {
    return getCompare.value.some(font => font.family === fontFamily)
  }

  // Watchers
  watch(getActiveFonts, () => {
    window.scrollTo(0, 0)
  })
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

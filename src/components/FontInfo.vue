<template>
  <div class="font-info">
    <div
      v-if="isRecommended(font)"
      class="font-info__recommended-flag"
    >
      <span>Recommended</span>
    </div>
    <div class="font-info__name">
      <span>{{ font.family }}</span>
    </div>
    <div class="font-info__styles">
      <span>{{ fontInfo(font) }}</span>
    </div>
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import { useStore } from 'vuex'

  defineProps(['font'])

  const store = useStore()

  const getRecommendedFonts = computed(() => store.state.recommendedFonts)

  const isRecommended = (font) => {
    return getRecommendedFonts.value.includes(font.family)
  }

  const fontInfo = (font) => {
    // determine the number of weights and italics
    let weights = 0
    let italics = 0
    font.variants.forEach(variant => {
      if (variant.includes('italic')) {
        italics++
      } else {
        weights++
      }
    })

    let weightLabel = weights === 1 ? 'weight' : 'weights'
    let italicLabel = italics === 1 ? 'italic' : 'italics'

    if (italics === 0) {
      return `${weights} ${weightLabel}`
    } else {
      return `${weights} ${weightLabel} w/ ${italicLabel}`
    }
  }
</script>

<style lang="scss" scoped>
  .font-info {
    display: flex;
    align-items: baseline;
    gap: 20px;
    padding-left: 6rem;
  }

  // padding-top: 10px;
  // border-top: 1px solid #e5e5e5;
  // flex: 0 0 200px;
  .font-info__name {
    // flex: 0 0 30px;
    display: flex;
    align-items: center;
    // color: blue;
  }

  .font-info__styles {
    // flex: 0 0 30px;
    display: flex;
    align-items: center;
    // color: gray;
    font-size: 12px;
    // margin-top: 10px;
  }

  // .font-info__recommended-flag {
  //   display: inline-block;
  //   // padding: 4px 5px 1px 5px;
  //   // border: 1px solid lighten(red, 40%);
  //   // border-radius: 3px;
  //   font-size: 16px;
  //   color: hsl(39, 100%, 50%);
  //   // background: lighten(yellow, 40%);
  //   // margin-top: 20px;
  // }
</style>
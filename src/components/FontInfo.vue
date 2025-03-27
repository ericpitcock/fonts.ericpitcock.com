<template>
  <p class="font-info">
    <span>{{ font.family }}</span>
    <span>{{ fontInfo(font) }}</span>
    <ep-badge
      v-if="isRecommended(font)"
      label="Top Pick"
    />
  </p>
</template>

<script setup>
  import { computed } from 'vue'
  import { useStore } from 'vuex'

  defineProps({
    font: {
      type: Object,
      required: true
    }
  })

  const store = useStore()

  const getRecommendedFonts = computed(() => store.state.recommendedFonts)

  const isRecommended = (font) => {
    return getRecommendedFonts.value.includes(font.family)
  }

  const fontInfo = (font) => {
    if (!font.variants) return

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
    align-items: center;
    gap: 2rem;
    padding-left: 6rem;

    .ep-badge {
      --ep-badge-bg-color: transparent;
      padding-bottom: 0.3rem;
    }
  }
</style>
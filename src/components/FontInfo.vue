<template>
  <div class="font-info-container">
    <p class="font-info">
      <span>{{ font.family }}</span>
      <span>{{ fontInfo(font) }}</span>
      <ep-badge
        v-if="isRecommended(font)"
        label="Top Pick"
      />
    </p>
  </div>
</template>

<script setup>
  import { useFontsStore } from '@/store/fontsStore'

  defineProps({
    font: {
      type: Object,
      required: true
    }
  })

  const fontsStore = useFontsStore()

  const isRecommended = (font) => {
    return fontsStore.recommendedFonts.includes(font.family)
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
  .font-info-container {
    width: 100%;
    container-name: fontinfo;
    container-type: inline-size;
  }

  .font-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    gap: 0.5rem;

    .ep-badge {
      --ep-badge-bg-color: transparent;
      padding-bottom: 0.3rem;
    }
  }

  @container fontinfo (width > 300px) {
    .font-info {
      flex-direction: row;
      align-items: center;
      gap: 2rem;
    }
  }
</style>
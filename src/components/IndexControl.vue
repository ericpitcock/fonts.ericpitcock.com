<template>
  <!-- <div class="sample-control"> -->
  <div class="sample-control__input">
    <ep-input
      v-model="sentenceSample"
      size="large"
      class="custom-sample-input"
      type="text"
      placeholder="Enter your own words"
    />
  </div>
  <div class="sample-control__font-size">
    <ep-range-input
      v-model="fontSize"
      class="font-size-input"
      :min="12"
      :max="120"
      :step="1"
    />
  </div>
  <!-- </div> -->
</template>

<script setup>
  import { computed } from 'vue'

  import EpRangeInput from '@/components/EpRangeInput.vue'
  import { useFontsStore } from '@/store/fontsStore'

  const fontsStore = useFontsStore()

  const sentenceSample = computed({
    get() {
      return fontsStore.sentenceSample
    },
    set(value) {
      fontsStore.sentenceSample = value
    }
  })

  const fontSize = computed({
    get() {
      return fontsStore.globalFontSize
    },
    set(value) {
      fontsStore.globalFontSize = value
    }
  })
</script>

<style lang="scss" scoped>
  .sample-control {
    height: 100%;
    display: flex;
    align-items: center;
    gap: 2rem;
    padding: 0 2rem 0 6rem;
  }

  .sample-control__font-count {
    flex: 0 1 10rem;
  }

  .sample-control__input {
    flex: 0 1 40rem;
  }

  :deep(.custom-sample-input) {
    --ep-input-focus-border-color: var(--primary-color-base);
  }

  .sample-control__font-size {
    flex: 0 0 20rem;
  }

  .app-header-button {
    margin-left: auto;
  }
</style>
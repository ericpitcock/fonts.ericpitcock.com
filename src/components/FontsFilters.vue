<template>
  <div class="optional-filters">
    <EpCheckbox
      id="recommended"
      v-model="recommendedFilter"
      name="recommended"
      label="Recommended"
      @update:model-value="updateRecommended"
    />
    <EpCheckbox
      id="italics"
      v-model="italicsFilter"
      name="italics"
      label="Italics"
      @update:model-value="updateItalics"
    />
    <EpCheckbox
      id="multiple-weights"
      v-model="multipleWeightsFilter"
      name="multiple-weights"
      label="2+ Weights"
      @update:model-value="updateMultipleWeights"
    />
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()

  // Computed properties for each filter
  const recommendedFilter = computed(() => store.state.filters.recommended)
  const italicsFilter = computed(() => store.state.filters.italics)
  const multipleWeightsFilter = computed(() => store.state.filters.multipleWeights)

  // Methods to handle updates
  const updateRecommended = (value) => {
    store.dispatch('updateFilters', { recommended: value })
  }

  const updateItalics = (value) => {
    store.dispatch('updateFilters', { italics: value })
  }

  const updateMultipleWeights = (value) => {
    store.dispatch('updateFilters', { multipleWeights: value })
  }
</script>

<style lang="scss" scoped>
  .optional-filters {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
</style>
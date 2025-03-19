<template>
  <div class="optional-filters">
    <h3>Filters</h3>
    <ep-checkbox
      id="recommended"
      v-model="recommendedFilter"
      label="Recommended"
      name="recommended"
      value="recommended"
    />
    <ep-checkbox
      id="italics"
      v-model="italicsFilter"
      label="Italics"
      name="italics"
      value="italics"
    />
    <ep-checkbox
      id="multiple-weights"
      v-model="multipleWeightsFilter"
      label="2+ Weights"
      name="multiple-weights"
      value="multipleWeights"
    />
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()

  const recommendedFilter = computed({
    get: () => store.state.filters.recommended,
    set: (value) => store.dispatch('updateFilters', { recommended: value })
  })

  const italicsFilter = computed({
    get: () => store.state.filters.italics,
    set: (value) => store.dispatch('updateFilters', { italics: value })
  })

  const multipleWeightsFilter = computed({
    get: () => store.state.filters.multipleWeights,
    set: (value) => store.dispatch('updateFilters', { multipleWeights: value })
  })
</script>

<style lang="scss" scoped>
  .optional-filters {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
</style>
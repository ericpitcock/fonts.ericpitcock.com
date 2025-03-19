<template>
  <div class="optional-filters">
    <div class="option">
      <input
        id="recommended"
        type="checkbox"
        name="recommended"
        :checked="$store.state.filters.recommended"
        @change="$store.dispatch('updateFilters', { recommended: !$store.state.filters.recommended })"
      >
      <label for="recommended"> Recommended &#9733;</label>
    </div>
    <div class="option">
      <input
        id="italics"
        type="checkbox"
        name="italics"
        :checked="$store.state.filters.italics"
        @change="$store.dispatch('updateFilters', { italics: !$store.state.filters.italics })"
      >
      <label for="italics"> Italics</label>
    </div>
    <div class="option">
      <input
        id="multiple-weights"
        type="checkbox"
        name="italics"
        :checked="$store.state.filters.multipleWeights"
        @change="$store.dispatch('updateFilters', { multipleWeights: !$store.state.filters.multipleWeights })"
      >
      <label for="multiple-weights"> 2+ Weights</label>
    </div>
  </div>
</template>

<script setup>
  // No need for additional imports as we're using direct store access
</script>

<style lang="scss" scoped>
  .optional-filters {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .option {
      display: flex;
      align-items: baseline;
      gap: 10px;
      cursor: pointer;

      input,
      label {
        cursor: pointer;
      }
    }
  }
</style>
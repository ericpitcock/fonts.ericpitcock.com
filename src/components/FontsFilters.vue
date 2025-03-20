<template>
  <ep-flex class="flex-col gap-30">
    <ep-flex class="flex-col gap-10">
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
        :disabled="!hasItalics"
      />
      <ep-checkbox
        id="multiple-weights"
        v-model="multipleWeightsFilter"
        label="2+ Weights"
        name="multiple-weights"
        value="multipleWeights"
      />
    </ep-flex>
    <div
      v-if="getSubsets.length > 0"
      class="subsets"
    >
      <ep-flex class="flex-col gap-10">
        <h3>Subsets</h3>
        <ep-flex class="flex-col gap-10">
          <ep-checkbox
            v-for="(subset, index) in getSubsets"
            :id="subset"
            :key="index"
            :label="subset.charAt(0).toUpperCase() + subset.slice(1)"
            :name="subset"
            :value="subset"
          />
        </ep-flex>
      </ep-flex>
    </div>
  </ep-flex>
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
    get: () => {
      if (!hasItalics.value) {
        return false
      }
      return store.state.filters.italics
    },
    set: (value) => store.dispatch('updateFilters', { italics: value })
  })

  const multipleWeightsFilter = computed({
    get: () => store.state.filters.multipleWeights,
    set: (value) => store.dispatch('updateFilters', { multipleWeights: value })
  })

  const getActiveFonts = computed(() => store.getters.getActiveFonts)

  // check if any active fonts have italics by searching the .variants array for 'italic' hasItalics boolean
  const hasItalics = computed(() => {
    return getActiveFonts.value.some(font => font.variants.some(variant => variant.includes('italic')))
  })

  // in active fonts, create an array of unique values from .subsets
  const getSubsets = computed(() => {
    let subsets = []
    getActiveFonts.value.forEach(font => {
      font.subsets.forEach(subset => {
        if (!subsets.includes(subset)) {
          subsets.push(subset)
        }
      })
    })
    return subsets
  })
</script>

<style lang="scss" scoped>
  // .optional-filters {
  //   display: flex;
  //   flex-direction: column;
  //   gap: 10px;
  // }
</style>
<template>
  <ep-flex class="flex-col gap-40">
    <ep-flex class="flex-col gap-10">
      <ep-checkbox
        id="recommended"
        v-model="recommendedFilter"
        label="Top Picks"
        name="recommended"
        value="recommended"
        @change="onFilterChange('recommended')"
      />
      <ep-checkbox
        id="italics"
        v-model="italicsFilter"
        label="Italics"
        name="italics"
        value="italics"
        :disabled="!hasItalics"
        @change="updateURL"
      />
      <ep-checkbox
        id="multiple-weights"
        v-model="multipleWeightsFilter"
        label="2+ Weights"
        name="multiple-weights"
        value="multipleWeights"
        @change="updateURL"
      />
    </ep-flex>
  </ep-flex>
</template>

<script setup>
  import { computed, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { useStore } from 'vuex'

  const store = useStore()
  const router = useRouter()

  const recommendedFilter = computed({
    get: () => store.state.filters.recommended,
    set: (value) => store.commit('setFilters', { recommended: value })
  })

  const italicsFilter = computed({
    get: () => {
      if (!hasItalics.value) {
        return false
      }
      return store.state.filters.italics
    },
    set: (value) => store.commit('setFilters', { italics: value })
  })

  const multipleWeightsFilter = computed({
    get: () => store.state.filters.multipleWeights,
    set: (value) => store.commit('setFilters', { multipleWeights: value })
  })

  const getActiveFonts = computed(() => store.getters.getActiveFonts)

  // check if any active fonts have italics by searching the .variants array for 'italic' hasItalics boolean
  const hasItalics = computed(() => {
    return getActiveFonts.value.some(font => font.variants.some(variant => variant.includes('italic')))
  })

  const onFilterChange = (filter) => {
    // if filter is false, remove it from the URL
    if (!store.state.filters[filter]) {
      const newQuery = { ...router.currentRoute.value.query }
      delete newQuery[filter]
      router.replace({ query: newQuery })
    } else {
      // if filter is true, add it to the URL
      router.replace({
        query: {
          ...router.currentRoute.value.query,
          [filter]: store.state.filters[filter]
        }
      })
    }
  }

  // Update URL directly on checkbox change
  const updateURL = () => {
    // Use a small delay to ensure the store state is updated first
    setTimeout(() => {
      store.dispatch('updateURLWithFilters', router)
    }, 10)
  }

  // Initialize URL with current filters on component mount
  onMounted(() => {
    updateURL()
  })
</script>
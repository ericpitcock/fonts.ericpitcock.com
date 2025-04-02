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

  import { useFontsStore } from '@/store/fontsStore'

  const fontsStore = useFontsStore()
  const router = useRouter()

  const recommendedFilter = computed({
    get: () => fontsStore.filters.recommended,
    set: (value) => fontsStore.filters.recommended = value
  })

  const italicsFilter = computed({
    get: () => {
      if (!hasItalics.value) {
        return false
      }
      return fontsStore.filters.italics
    },
    set: (value) => fontsStore.filters.italics = value
  })

  const multipleWeightsFilter = computed({
    get: () => fontsStore.filters.multipleWeights,
    set: (value) => fontsStore.filters.multipleWeights = value
  })

  // check if any active fonts have italics by searching the .variants array for 'italic' hasItalics boolean
  const hasItalics = computed(() => {
    return fontsStore.getFilteredFonts.some(font =>
      font.variants.some(variant => variant.includes('italic'))
    )
  })

  const onFilterChange = (filter) => {
    // if filter is false, remove it from the URL
    if (!fontsStore.filters[filter]) {
      const newQuery = { ...router.currentRoute.value.query }
      delete newQuery[filter]
      router.replace({ query: newQuery })
    } else {
      // if filter is true, add it to the URL
      router.replace({
        query: {
          ...router.currentRoute.value.query,
          [filter]: fontsStore.filters[filter]
        }
      })
    }
  }

  // Update URL directly on checkbox change
  const updateURL = () => {
    // Use a small delay to ensure the store state is updated first
    setTimeout(() => {
      fontsStore.updateURLWithFilters(router)
    }, 10)
  }

  // Initialize URL with current filters on component mount
  onMounted(() => {
    updateURL()
  })
</script>
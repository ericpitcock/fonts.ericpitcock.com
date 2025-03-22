<template>
  <fonts-layout>
    <template #sidebar>
      <fonts-navigation />
    </template>
    <template #main>
      <div class="index">
        <div class="index__header">
          <SampleControl />
        </div>
        <div class="index__controls">
          <span>Sort by:</span>
          <EpSelect
            v-model="sortBy"
            :options="sortOptions"
            select-id="sort"
            placeholder="Sort by"
            style="margin-right: 1rem;"
          />
          <span>Order by:</span>
          <EpSelect
            v-model="orderBy"
            :options="orderOptions"
            select-id="order"
            placeholder="Order by"
          />
        </div>
        <div
          ref="content"
          class="index__content"
        >
          <div class="content-padder">
            <template v-if="sortedFonts.length === 0">
              <div class="no-results">
                No fonts found. Try
                <span @click="$store.commit('resetFilters')">
                  resetting all filters.
                </span>
              </div>
            </template>
            <FontContainer
              v-for="(font, index) in sortedFonts"
              :key="index"
              :font="font"
              @click="toFontSpecimen(font)"
            />
          </div>
        </div>
        <div class="index__status-bar">
          <ep-item-count
            :count="getFontCount"
            singular="font"
            plural="fonts"
          />
        </div>
      </div>
    </template>
  </fonts-layout>
</template>

<script setup>
  import { computed, ref, watch } from 'vue'
  import { useRouter } from 'vue-router'
  import { useStore } from 'vuex'

  import FontContainer from '@/components/FontContainer.vue'
  import FontsNavigation from '@/components/FontsNavigation.vue'
  import SampleControl from '@/components/SampleControl.vue'
  import FontsLayout from '@/layouts/FontsLayout.vue'

  const store = useStore()
  const router = useRouter()

  const getActiveFonts = computed(() => store.getters.getActiveFonts)
  const getFontCount = computed(() => store.getters.getFontCount)

  // Reactive sort and order states
  const sortBy = ref('recommended')
  const orderBy = ref('ascending')

  // Options for the selects
  const sortOptions = [
    { label: 'Recommended', value: 'recommended' },
    { label: 'Alphabetical', value: 'alphabetical' }
  ]

  const orderOptions = [
    { label: 'Ascending', value: 'ascending' },
    { label: 'Descending', value: 'descending' }
  ]

  // Computed property to sort the fonts based on selection
  const sortedFonts = computed(() => {
    // Create a shallow copy so we don't mutate the original list.
    let fonts = [...getActiveFonts.value]

    if (sortBy.value === 'recommended') {
      // Sort by recommended order first.
      const recommendedList = store.state.recommendedFonts
      fonts.sort((a, b) => {
        // Get index in recommendedList or set to a high number if not recommended.
        const aIndex = recommendedList.indexOf(a.family) === -1 ? Number.MAX_VALUE : recommendedList.indexOf(a.family)
        const bIndex = recommendedList.indexOf(b.family) === -1 ? Number.MAX_VALUE : recommendedList.indexOf(b.family)
        // If one is recommended and the other isn't, the recommended one comes first.
        if (aIndex !== bIndex) return aIndex - bIndex
        // Otherwise, sort alphabetically.
        return a.family.localeCompare(b.family)
      })
    } else if (sortBy.value === 'alphabetical') {
      fonts.sort((a, b) => a.family.localeCompare(b.family))
    }

    // Reverse order if descending.
    if (orderBy.value === 'descending') {
      fonts.reverse()
    }

    return fonts
  })

  // Navigation function for font specimen
  const toFontSpecimen = (font) => {
    router.push({
      path: `/${font.family.toLowerCase().replace(/\s+/g, '-')}`,
    })
  }

  const content = ref(null)
  watch(getActiveFonts, () => {
    if (content.value) {
      content.value.scrollTop = 0
    }
  })
</script>

<style lang="scss" scoped>
  .index {
    display: grid;
    grid-template-rows: 8rem 4rem 1fr 4rem;
    grid-template-columns: 1fr;
    overflow: hidden;
  }

  .index__header {
    grid-row: 1/2;
    grid-column: 1/2;
  }

  .index__controls {
    grid-row: 2/3;
    grid-column: 1/2;
    display: flex;
    align-items: center;
    padding: 0 6rem;
    border-bottom: 0.1rem solid var(--border-color);
  }

  .index__content {
    grid-row: 3/4;
    grid-column: 1/2;
    overflow: auto;
    overscroll-behavior: contain;
  }

  .index__status-bar {
    grid-row: 4/5;
    grid-column: 1/2;
    display: flex;
    align-items: center;
    border-top: 0.1rem solid var(--border-color);
    padding: 0 6rem;
  }

  .content-padder {
    padding: 0 0 20rem 0;
  }

  .no-results {
    padding: 3rem 6rem;
    font-size: 1.5em;

    span {
      color: #007bff;
      cursor: pointer;
    }
  }
</style>
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
          <ep-button-group
            :items="viewOptions"
            :active="viewMode"
            active-class="ep-button-var--primary"
            @click="onViewChange"
          />
          <ep-select
            v-model="sortBy"
            :options="sortOptions"
            select-id="sort"
            placeholder="Sort by"
          />
          <ep-select
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
          <template v-if="sortedFonts.length === 0">
            <div class="no-results">
              <h1 class="ui-heading">
                No fonts found
              </h1>
              <ep-button
                label="Reset filters"
                @click="$store.commit('resetFilters')"
              />
            </div>
          </template>
          <div :class="['content-padder', `${viewClassName}`]">
            <font-container
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

  const sortBy = ref('alphabetical')
  const orderBy = ref('ascending')

  const sortOptions = [
    { label: 'Recommended', value: 'recommended' },
    { label: 'Alphabetical', value: 'alphabetical' }
  ]

  const orderOptions = [
    { label: 'Ascending', value: 'ascending' },
    { label: 'Descending', value: 'descending' }
  ]

  const viewMode = ref(0)
  const viewOptions = [
    { label: 'List', value: 'list' },
    { label: 'Cards', value: 'cards' },
  ]
  const viewClassName = computed(() => `content-padder--${viewOptions[viewMode.value].value}`)

  const onViewChange = ({ item, index }) => {
    viewMode.value = index
    console.log(item.value, index)
  }

  const sortedFonts = computed(() => {
    let fonts = [...getActiveFonts.value]

    if (sortBy.value === 'recommended') {
      const recommendedList = store.state.recommendedFonts
      fonts.sort((a, b) => {
        const aIndex =
          recommendedList.indexOf(a.family) === -1
            ? Number.MAX_VALUE
            : recommendedList.indexOf(a.family)
        const bIndex =
          recommendedList.indexOf(b.family) === -1
            ? Number.MAX_VALUE
            : recommendedList.indexOf(b.family)
        if (aIndex !== bIndex) return aIndex - bIndex
        return a.family.localeCompare(b.family)
      })
    } else if (sortBy.value === 'alphabetical') {
      fonts.sort((a, b) => a.family.localeCompare(b.family))
    }

    if (orderBy.value === 'descending') {
      fonts.reverse()
    }

    return fonts
  })

  const category = computed(() => store.state.categoryFilter)
  const toFontSpecimen = (font) => {
    router.push({
      path: `/${category.value}/${font.family.toLowerCase().replace(/\s+/g, '-')}`
    })
  }

  const content = ref(null)
  watch(() => router.currentRoute.value.params, (params) => {
    if (content.value) {
      content.value.scrollTop = 0
    }
    store.commit('setCategoryFilter', params.category)
  })
</script>

<style lang="scss" scoped>
  .index {
    display: grid;
    grid-template-rows: 6.1rem 4rem 1fr 4rem;
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
    gap: 2rem;
    padding: 0 6rem;
    border-bottom: 0.1rem solid var(--border-color);
    background-color: var(--interface-bg);
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

  .content-padder--list {}

  .content-padder--cards {
    display: grid;
    grid-gap: 3rem;
    grid-template-columns: repeat(auto-fill, 30rem);
    justify-content: start;
    padding: 3rem;

    .font-container {
      flex: 1;
      padding: 3rem;
      border: 0.1rem solid var(--border-color);
      border-radius: var(--border-radius--large);

      :deep(.font) {
        padding: 0;
      }
    }
  }

  .no-results {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 6rem;
  }
</style>
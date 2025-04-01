<template>
  <fonts-layout>
    <template #sidebar>
      <fonts-navigation />
    </template>
    <template #header>
      <fonts-app-header>
        <template #left>
          <index-control />
        </template>
        <template #center>
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
        </template>
      </fonts-app-header>
    </template>
    <template #main>
      <div class="index__content">
        <template v-if="sortedFonts.length === 0">
          <div class="no-results">
            <h1 class="ui-heading">
              No fonts found
            </h1>
            <ep-button
              label="Reset filters"
              @click="fontsStore.resetFilters()"
            />
          </div>
        </template>
        <div class="content-padder">
          <fonts-card-layout
            :fonts="sortedFonts"
            :view="viewModeName"
            @click="onFontCardClick"
          />
        </div>
      </div>
    </template>
    <template #footer>
      <div class="index__status-bar">
        <ep-item-count
          :count="getFontCount"
          singular="font"
          plural="fonts"
        />
      </div>
    </template>
  </fonts-layout>

  <fonts-specimen-modal
    v-if="$route.query.font"
    @close="closeModal"
  />
</template>

<script setup>
  import { computed, ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useFontsStore } from '@/store/fontsStore'

  import FontsAppHeader from '@/components/FontsAppHeader.vue'
  import FontsNavigation from '@/components/FontsNavigation.vue'
  import IndexControl from '@/components/IndexControl.vue'
  import FontsCardLayout from '@/layouts/FontsCardLayout.vue'
  import FontsLayout from '@/layouts/FontsLayout.vue'
  import FontsSpecimenModal from '@/layouts/FontsSpecimenModal.vue'

  const fontsStore = useFontsStore()
  const router = useRouter()
  const route = useRoute()

  const getActiveFonts = computed(() => fontsStore.getActiveFonts)
  const getFontCount = computed(() => fontsStore.getFontCount)
  const selectedFont = ref(null)

  const sortBy = ref('alphabetical')
  const orderBy = ref('ascending')

  const sortOptions = [
    { label: 'Sort: Top Picks', value: 'recommended' },
    { label: 'Sort: A-Z', value: 'alphabetical' }
  ]

  const orderOptions = [
    { label: 'Order: Asc', value: 'ascending' },
    { label: 'Order: Desc', value: 'descending' }
  ]

  const viewMode = ref(0)
  const viewOptions = [
    { label: 'List', value: 'list' },
    { label: 'Cards', value: 'cards' },
  ]
  const viewModeName = computed(() => viewOptions[viewMode.value].value)

  const onViewChange = ({ item, index }) => {
    viewMode.value = index
    console.log(item.value, index)
  }

  const sortedFonts = computed(() => {
    let fonts = [...getActiveFonts.value]

    if (sortBy.value === 'recommended') {
      const recommendedList = fontsStore.recommendedFonts
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

  const category = computed(() => fontsStore.categoryFilter)

  const onFontCardClick = (font) => {
    // Update the URL with the font and tab parameters
    router.push({
      path: `/${category.value}`,
      query: {
        ...route.query,
        font: font.family,
        tab: 'overview'
      }
    })
  }

  const closeModal = () => {
    console.log('closeModal')
    selectedFont.value = null
  }

  // Watch for font parameter in URL
  watch(() => route.query.font, (fontName) => {
    selectedFont.value = fontName || null
  }, { immediate: true })

  // Watch for category parameter changes
  watch(() => route.params, (params) => {
    fontsStore.categoryFilter = params.category
  })
</script>

<style lang="scss" scoped>
  .content-padder {
    padding: 3rem 3rem 20rem 3rem;
    background: var(--interface-bg);
  }

  .index__status-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding: 0 3rem;
    background: var(--interface-surface);
    border-top: 0.1rem solid var(--border-color);
  }

  .no-results {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    padding: 6rem;
  }
</style>
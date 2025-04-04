<template>
  <nav class="ep-flex flex-col gap-30">
    <div class="title">
      <router-link to="/">
        <h1 :style="titleStyle">
          Fonts
        </h1>
      </router-link>
    </div>
    <ep-flex class="flex-col gap-40">
      <ep-button
        label="AI Search"
        class="ep-button-var--ghost category-filters__button"
        :to="{ path: '/', query: undefined }"
      />
      <ep-flex class="category-filters flex-col gap-20">
        <h3 class="ui-heading">
          Categories
        </h3>
        <ep-flex class="category-filters flex-col gap-5">
          <ep-button
            v-for="(category, index) in fontCategories"
            :key="index"
            :label="category.label"
            class="ep-button-var--ghost category-filters__button"
            :to="{ path: `/${category.value}`, query: { ...$route.query } }"
          />
        </ep-flex>
      </ep-flex>
      <ep-flex
        v-if="$route.name === 'category'"
        class="flex-col gap-20"
      >
        <h3 class="ui-heading">
          Filters
        </h3>
        <fonts-filters />
      </ep-flex>
    </ep-flex>
  </nav>
</template>

<script setup>
  import { computed, onMounted, ref } from 'vue'

  import FontsFilters from '@/components/FontsFilters.vue'
  import { useWebFont } from '@/composables/useWebFont'

  const currentFontIndex = ref(0)

  const fontCategories = [
    { label: 'Sans Serif', value: 'sans-serif' },
    { label: 'Serif', value: 'serif' },
    { label: 'Display', value: 'display' },
    { label: 'Handwriting', value: 'handwriting' },
    { label: 'Monospace', value: 'monospace' }
  ]

  const titleFonts = [
    { fontFamily: 'Bungee Shade', fontSize: 30 },
    { fontFamily: 'Barrio', fontSize: 30 },
    { fontFamily: 'Ms Madi', fontSize: 40 },
    { fontFamily: 'Bowlby One', fontSize: 30 },
    { fontFamily: 'Gaegu', fontSize: 40 },
    { fontFamily: 'Caesar Dressing', fontSize: 30 },
    { fontFamily: 'Faster One', fontSize: 30 },
  ]

  const { loadGoogleFonts } = useWebFont()

  const loadTitleFonts = () => {
    const titleFontFamilies = titleFonts.map(font => font.fontFamily)
    loadGoogleFonts(titleFontFamilies)
  }

  const titleStyle = computed(() => ({
    fontFamily: titleFonts[currentFontIndex.value].fontFamily,
    fontSize: `${titleFonts[currentFontIndex.value].fontSize}px`
  }))

  const setupFontInterval = () => {
    setInterval(() => {
      currentFontIndex.value = (currentFontIndex.value + 1) % titleFonts.length
    }, 4000)
  }

  onMounted(() => {
    loadTitleFonts()
    setupFontInterval()
  })
</script>

<style lang="scss" scoped>
  nav {
    grid-row: 1;
    grid-column: 1/2;
    padding: 3rem;
    background: var(--interface-surface);
    border-right: 0.1rem solid var(--border-color);
    overflow-y: auto;
  }

  .title {
    flex: 0 0 50px;
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
  }

  h1 {
    line-height: 1;
    color: var(--text-color--loud);
  }

  .ep-button-var--ghost.category-filters__button {
    cursor: pointer;
    --ep-button-hover-bg-color: var(--primary-color-base);
    --ep-button-hover-text-color: white;
    --ep-button-hover-border-color: var(--primary-color-base);

    // &:hover {
    //   cursor: pointer;
    //   --ep-button-text-color: var(--primary-color-base);
    // }
    &.router-link-active {
      --ep-button-text-color: white;
      --ep-button-bg-color: var(--primary-color-base);

      &:hover {
        --ep-button-text-color: white;
        --ep-button-bg-color: var(--primary-color-base);
        cursor: default;
      }
    }
  }
</style>
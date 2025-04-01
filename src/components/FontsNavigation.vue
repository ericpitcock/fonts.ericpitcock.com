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
        label="Search"
        class="ep-button-var--ghost category-filters__filter-button"
        @click="toPath"
      />
      <ep-flex class="category-filters flex-col gap-20">
        <h3 class="ui-heading">
          Categories
        </h3>
        <ep-flex class="category-filters flex-col gap-10">
          <router-link
            v-for="(category, index) in getFontCategories"
            :key="index"
            class="category-filters__filter-button"
            :to="{ path: `/${category}`, query: { ...$route.query } }"
          >
            {{ category }}
          </router-link>
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
  import { useRoute, useRouter } from 'vue-router'

  import FontsFilters from '@/components/FontsFilters.vue'
  import { useWebFont } from '@/composables/useWebFont'
  import { useFontsStore } from '@/store/fontsStore'

  const router = useRouter()
  const route = useRoute()
  const fontsStore = useFontsStore()

  const toPath = () => {
    if (route.path !== '/') {
      router.push('/')
    }
  }

  const currentFontIndex = ref(0)

  const getFontCategories = computed(() => fontsStore.getFontCategories)

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

  .category-filters {
    &__filter-button {
      text-transform: capitalize;
      cursor: pointer;

      &.router-link-active {
        color: var(--text-color--loud);

        &:hover {
          cursor: default;
        }
      }
    }
  }

  .font-count {
    font-size: 12px;
    color: gray;
  }
</style>
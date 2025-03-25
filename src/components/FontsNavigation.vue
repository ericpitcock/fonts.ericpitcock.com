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
      <router-link
        class="category-filters__filter-button"
        to="/"
      >
        Search
      </router-link>
      <ep-flex class="category-filters flex-col gap-20">
        <h3 class="ui-heading">
          Categories
        </h3>
        <ep-flex class="category-filters flex-col gap-10">
          <router-link
            v-for="(category, index) in getFontCategories"
            :key="index"
            class="category-filters__filter-button"
            :to="`/${category}`"
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
  import { useStore } from 'vuex'

  import FontsFilters from '@/components/FontsFilters.vue'
  import { useWebFont } from '@/composables/useWebFont'

  const store = useStore()

  const currentFontIndex = ref(0)

  const getCategoryFilter = computed(() => store.state.categoryFilter)
  const getFontCategories = computed(() => store.getters.getFontCategories)

  const titleFonts = [
    { fontFamily: 'Bungee Shade', fontSize: 30 },
    { fontFamily: 'Barrio', fontSize: 30 },
    { fontFamily: 'Ms Madi', fontSize: 40 },
    { fontFamily: 'Bowlby One', fontSize: 30 },
    { fontFamily: 'Gaegu', fontSize: 40 },
    { fontFamily: 'Caesar Dressing', fontSize: 30 },
    { fontFamily: 'Faster One', fontSize: 30 },
  ]

  const { loadGoogleFonts, loading, error } = useWebFont()

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
    // display: flex;
    // flex-direction: column;
    // gap: 3rem;
    padding: 3rem;
    background: var(--interface-bg);
    border-right: 0.1rem solid var(--border-color);
    overflow-y: auto;
  }

  .title {
    flex: 0 0 50px;
    display: flex;
    align-items: center;
  }

  h1 {
    line-height: 1;
    color: var(--text-color--loud);
  }

  .category-filters {

    // display: flex;
    // flex-direction: column;
    // gap: 10px;
    &__filter-button {
      text-transform: capitalize;
      cursor: pointer;

      &.router-link-active {
        color: var(--text-color--loud);
      }
    }
  }

  .font-count {
    font-size: 12px;
    color: gray;
  }

  // .optional-filters {
  //   display: flex;
  //   flex-direction: column;
  //   gap: 10px;
  //   .option {
  //     display: flex;
  //     align-items: baseline;
  //     gap: 10px;
  //     cursor: pointer;
  //     input,
  //     label {
  //       cursor: pointer;
  //     }
  //   }
  // }
</style>
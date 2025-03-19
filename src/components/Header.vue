<template>
  <header>
    <div class="title">
      <h1 :style="{
        fontFamily: fonts[currentFontIndex].fontFamily,
        fontSize: `${fonts[currentFontIndex].fontSize}px`
      }">
        Fonts
      </h1>
    </div>
    <div class="category-filters">
      <span
        v-for="(category, index) in getFontCategories"
        :key="index"
        :class="[
          'category-filters__filter-button',
          { 'category-filters__filter-button--active': getCategoryFilter == category }
        ]"
        @click="$store.dispatch('updateCategoryFilter', category)"
      >
        {{ category }}
      </span>
    </div>
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
    <ep-theme-toggle
      class="app-header-button ep-button-var--ghost"
      :current-theme="theme"
      @toggle-theme="toggleTheme"
    />
  </header>
</template>

<script setup>
  import { computed, onMounted, ref } from 'vue'
  import { useStore } from 'vuex'
  import WebFont from 'webfontloader'

  const store = useStore()

  const fonts = [
    { fontFamily: 'Bungee Shade', fontSize: 30 },
    { fontFamily: 'Barrio', fontSize: 30 },
    { fontFamily: 'Ms Madi', fontSize: 40 },
    { fontFamily: 'Bowlby One', fontSize: 30 },
    { fontFamily: 'Gaegu', fontSize: 40 },
    { fontFamily: 'Caesar Dressing', fontSize: 30 },
    { fontFamily: 'Faster One', fontSize: 30 },
  ]
  const currentFontIndex = ref(0)


  const getCategoryFilter = computed(() => store.getters.getCategoryFilter)
  const getFontCategories = computed(() => store.getters.getFontCategories)
  // const getRecommendedOnly = computed(() => store.getters.getRecommendedOnly)
  const toggleTheme = () => store.dispatch('toggleTheme')
  const theme = computed(() => store.state.theme)


  const loadFonts = () => {
    WebFont.load({
      google: {
        families: fonts.map(font => font.fontFamily.replace(/\s+/g, '+')),
      },
      active: () => {
        // Fonts are loaded, you can apply the first font
        // You can also add any additional logic here
        // console.log('Fonts are loaded')
      },
      fontactive: (familyName) => {
        // Apply the next font when each font is loaded
        // currentFont = familyName
      },
    })
  }

  const setupFontInterval = () => {
    setInterval(() => {
      currentFontIndex.value = (currentFontIndex.value + 1) % fonts.length
      // currentFont = fonts[currentFontIndex.value]
    }, 4000)
  }

  // Lifecycle hooks
  onMounted(() => {
    loadFonts()
    setupFontInterval()
  })
</script>

<style lang="scss" scoped>
  header {
    position: fixed;
    width: 200px;
    height: 100%;
    grid-row: 1;
    grid-column: 1;
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 30px;
    background: var(--interface-surface);
    border-right: 1px solid #d3d3d3;
    user-select: none;
  }

  .title {
    flex: 0 0 50px;
    display: flex;
    align-items: center;
  }

  h1 {
    line-height: 1;
  }

  .category-filters {
    display: flex;
    flex-direction: column;
    gap: 10px;

    &__filter-button {
      text-transform: capitalize;
      cursor: pointer;

      &--active {
        color: red;
      }
    }
  }

  .font-count {
    font-size: 12px;
    color: gray;
  }

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
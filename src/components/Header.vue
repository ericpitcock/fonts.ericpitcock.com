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
        @click="$store.dispatch('updateCategoryFilter', category)"
        :class="[
        'category-filters__filter-button',
        { 'category-filters__filter-button--active': getCategoryFilter == category }
      ]">
        {{ category }}
      </span>

    </div>
    <div class="optional-filters">
      <div class="option">
        <input
          type="checkbox"
          name="recommended"
          id="recommended"
          @change="$store.dispatch('updateFilters', { recommended: !$store.state.filters.recommended })"
          :checked="$store.state.filters.recommended">
        <label for="recommended"> Recommended &#9733;</label>
      </div>
      <div class="option">
        <input
          type="checkbox"
          name="italics"
          id="italics"
          @change="$store.dispatch('updateFilters', { italics: !$store.state.filters.italics })"
          :checked="$store.state.filters.italics">
        <label for="italics"> Italics</label>
      </div>
      <div class="option">
        <input
          type="checkbox"
          name="italics"
          id="multiple-weights"
          @change="$store.dispatch('updateFilters', { multipleWeights: !$store.state.filters.multipleWeights })"
          :checked="$store.state.filters.multipleWeights">
        <label for="multiple-weights"> 2+ Weights</label>
      </div>
    </div>
  </header>
</template>

<script>
  import WebFont from 'webfontloader'
  import { mapGetters } from 'vuex'

  export default {
    name: 'Header',
    data() {
      return {
        fonts: [
          { fontFamily: 'Bungee Shade', fontSize: 30 },
          { fontFamily: 'Barrio', fontSize: 30 },
          { fontFamily: 'Ms Madi', fontSize: 40 },
          { fontFamily: 'Bowlby One', fontSize: 30 },
          { fontFamily: 'Gaegu', fontSize: 40 },
          { fontFamily: 'Caesar Dressing', fontSize: 30 },
          { fontFamily: 'Faster One', fontSize: 30 },
        ],
        currentFontIndex: 0,
      }
    },
    computed: {
      ...mapGetters([
        'getCategoryFilter',
        'getFontCategories',
        // 'getRecommendedOnly',
      ]),
    },
    methods: {
      loadFonts() {
        WebFont.load({
          google: {
            families: this.fonts.map(font => font.fontFamily.replace(/\s+/g, '+')),
          },
          active: () => {
            // Fonts are loaded, you can apply the first font
            // You can also add any additional logic here
            // console.log('Fonts are loaded')
          },
          fontactive: (familyName) => {
            // Apply the next font when each font is loaded
            // this.currentFont = familyName
          },
        })
      },
      setupFontInterval() {
        setInterval(() => {
          this.currentFontIndex = (this.currentFontIndex + 1) % this.fonts.length
          // this.currentFont = this.fonts[this.currentFontIndex]
        }, 4000)
      },
    },
    mounted() {
      this.loadFonts()
      this.setupFontInterval()
    },
  }
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
    background: white;
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
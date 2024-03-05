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
    <div class="options">
      <input
        type="checkbox"
        name="recommended"
        id="recommended"
        @change="$store.dispatch('toggleRecommendedOnly')"
        :checked="getRecommendedOnly">
      <label for="recommended"> Recommended &#9733;</label>
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
          { fontFamily: 'Barrio', fontSize: 30 },
          { fontFamily: 'Bungee Shade', fontSize: 30 },
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
        'getRecommendedOnly',
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
            console.log('Fonts are loaded')
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
        }, 2000)
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
</style>
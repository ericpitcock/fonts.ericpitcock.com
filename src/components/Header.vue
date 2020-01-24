<template>
  <div :class="['header', { 'no-border': getCompareFontList.length >= 1 }]">
    <div class="category-filters">
      <span
        v-for="(category, index) in getFontCategories"
        :key="index"
        @click="$store.dispatch('updateCategoryFilter', category)"
        :class="['category-filters__filter-button', { 'category-filters__filter-button--active': getCategoryFilter == category }]"
      >
        <span v-if="category == 'sans-serif'">TEXT</span>
        <span v-if="category == 'display'">HEADLINE</span>
        {{ category }}
      </span>
      <span>
        <input
          type="checkbox"
          name="recommended"
          id="recommended"
          @change="$store.dispatch('toggleRecommendedOnly')"
          :checked="getRecommendedOnly"
        >
        <label for="recommended">Recommended only</label>
      </span>
      <span class="font-count">
        {{ getActiveFonts.length }} fonts
      </span>
    </div>
    <div class="sample-control">
      <div
        v-for="(sampleType, index) in samples"
        :key="index"
        :class="[
          'sample-control__button',
          { 'sample-control__button--active': getFontSample == sampleType.component }
        ]"
        @click="$store.dispatch('updateFontSample', sampleType.component)"
      >
        {{ sampleType.name }}
      </div>
      <input
        class="custom-sample-input"
        v-model="customSample"
        @focus="customFocus()"
        type="text"
        placeholder="Enter your own words"
      >
      <div class="font-size-slider">
        <input name="font-size" type="range" min="12" max="60" v-model="fontSize" step="1" v-once>
        <label for="font-size">{{ fontSize }}px</label>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Header',
    data() {
      return {
        samples: [
          {
            name: 'Sentence',
            component: 'SentenceSample'
          },
          {
            name: 'Alphabet',
            component: 'AlphabetSample'
          },
          {
            name: 'Paragraph',
            component: 'ParagraphSample'
          }
        ]
      }
    },
    computed: {
      ...mapGetters([
        'getActiveFonts',
        'getCategoryFilter',
        'getCompareFontList',
        'getFontCategories',
        'getFontSample',
        'getGlobalFontSize',
        'getRecommendedOnly'
      ]),
      customSample: {
        get() {
          return this.getCustomSample
        },
        set(value) {
          this.$store.dispatch('updateCustomSample', value)
        }
      },
      fontSize: {
        get() {
          return this.getGlobalFontSize
        },
        set(value) {
          this.$store.dispatch('updateGlobalFontSize', value)
        }
      }
    },
    methods: {
      customFocus() {
        this.$store.dispatch('updateFontSample', 'CustomSample')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .header {
    // option for sticky header
    position: sticky;
    top: 0;
    z-index: 1;
    // end option
    grid-row: 1;
    grid-column: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #fafafa;
    border-bottom: 1px solid #d3d3d3;
    flex: 0 0 auto;
    > * + * {
      margin-top: 20px;
    }
    &.no-border {
      border-bottom-color: #fafafa;
    }
  }
  .category-filters {
    &__filter-button {
      text-transform: capitalize;
      cursor: pointer;
      & + span { margin-left: 20px; }
      &--active {
        color: red;
      }
    }
  }
  .sample-control {
    display: flex;
    margin-left: -6px;
    &__button {
      display: flex;
      align-items: center;
      height: 29px;
      padding: 3px 10px 0 10px;
      border: 1px solid #e6e6e6;
      font-size: 11px;
      &:hover:not(.sample-control__button--active) {
        background: lighten(yellow, 40%);
        cursor: pointer;
      }
      &--active {
        background: yellow;
      }
      & + & {
        border-left: none;
      }
      &:first-child {
        padding-left: 15px;
        border-radius: 15px 0 0 15px;
      }
    }
    .custom-sample-input {
      width: 300px;
      padding: 3px 0 0 15px;
      border: 1px solid #e6e6e6;
      border-left: none;
      border-radius: 0 15px 15px 0;
      font-size: 11px;
      &:hover {
        background: lighten(yellow, 40%);
        cursor: pointer;
      }
      &::placeholder {
        font-size: 11px;
        color: black;
      }
      &:focus {
        background: yellow;
        outline: none;
      }
    }
    .font-size-slider {
      display: flex;
      align-items: center;
      margin-left: 20px;
      label {
        margin-left: 10px;
      }
    }
  }
  .font-count {
    font-size: 12px;
    color: gray;
  }
</style>
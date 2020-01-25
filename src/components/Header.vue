<template>
  <div :class="['header', { 'no-border': getCompareFontList.length >= 1 }]">
    <div class="container">
      <div class="content">
        <div class="category-filters">
          <Title />
          <div
            v-for="(category, index) in getFontCategories"
            :key="index"
            @click="updateCategory(category)"
            :class="['category-filters__filter-button', { 'category-filters__filter-button--active': getCategoryFilter == category }]"
          >
            <div v-if="category == 'sans-serif'" class="category-filters__group-label">TEXT</div>
            <div v-if="category == 'display'" class="category-filters__group-label">HEADLINE</div>
            {{ category }}
          </div>
          <div class="font-count">
            {{ getActiveFonts.length }} fonts
          </div>
          <div class="recommended-toggle">
            <input
              type="checkbox"
              name="recommended"
              id="recommended"
              @change="$store.dispatch('toggleRecommendedOnly')"
              :checked="getRecommendedOnly"
            >
            <label for="recommended">Recommended only</label>
          </div>
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
    </div>
  </div>
</template>

<script>
  import Title from '@/components/Title'
  import { mapGetters } from 'vuex'

  export default {
    name: 'Header',
    components: {
      Title
    },
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
      },
      async updateCategory(category) {
        this.$store.state.globalLoading = true
        await this.$store.dispatch('updateCategoryFilter', category)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    height: 100%;
    align-items: stretch;
    /deep/ .content {
      display: flex;
      flex-direction: column;
      padding: 0 30px;
    }
  }
  .header {
    // option for sticky header
    position: sticky;
    top: 0;
    z-index: 1;
    // end option
    grid-row: 1;
    grid-column: 1;
    // display: flex;
    // flex-direction: column;
    // align-items: center;
    // justify-content: center;
    background: #fafafa;
    // padding: 0 80px;
    border-bottom: 1px solid #e6e6e6;
    // flex: 0 0 auto;
    // > * + * {
    //   margin-top: 20px;
    // }
    &.no-border {
      border-bottom-color: #fafafa;
    }
  }
  .category-filters {
    flex: 2 0 auto;
    display: flex;
    align-items: flex-end;
    padding-bottom: 10px;
    border-bottom: 1px solid #e6e6e6;
    // background: lighten(red, 40%);
    &__group-label {
      font-size: 10px;
      color: gray;
      margin-bottom: 5px;
    }
    &__filter-button {
      text-transform: capitalize;
      cursor: pointer;
      & + & { margin-left: 40px; }
      &--active {
        color: red;
      }
    }
  }
  .recommended-toggle {
    margin-left: auto;
    input {
      cursor: pointer;
    }
    label {
      font-size: 12px;
      padding-left: 5px;
      cursor: pointer;
    }
  }
  .font-count {
    font-size: 12px;
    color: gray;
    margin-left: 50px;
  }
  .sample-control {
    flex: 1 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    // background: lighten(green, 40%);
    padding: 4px 0;
    // margin-left: -3px;
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
        color: red;
        background: white;
      }
      & + & {
        border-left: none;
      }
      &:first-child {
        padding-left: 15px;
        border-radius: 6px 0 0 6px;
      }
    }
    .custom-sample-input {
      width: 300px;
      height: 29px;;
      padding: 3px 0 0 15px;
      border: 1px solid #e6e6e6;
      border-left: none;
      border-radius: 0 6px 6px 0;
      font-size: 11px;
      background: transparent;
      &:hover {
        background: lighten(yellow, 40%);
        cursor: pointer;
      }
      &::placeholder {
        font-size: 11px;
        color: black;
      }
      &:focus {
        background: white;
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
</style>
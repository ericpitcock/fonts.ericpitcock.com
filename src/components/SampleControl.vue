<template>
  <div class="sample-control">
    <span class="font-count">
      {{ getFontCount }} fonts
    </span>
    <div
      v-for="(sampleType, index) in samples"
      :key="index"
      :class="[
        'sample-control__button',
        { 'sample-control__button--active': getFontSample == sampleType.component }
      ]"
      @click="updateSampleType(sampleType.component)">
      {{ sampleType.name }}
    </div>
    <input
      class="custom-sample-input"
      v-model="customSample"
      @focus="customFocus()"
      type="text"
      placeholder="Enter your own words">
    <div class="font-size-slider">
      <input name="font-size" type="range" min="12" max="60"
        v-model="fontSize" step="1">
      <label for="font-size">{{ fontSize }}px</label>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'SampleControl',
    data() {
      return {
        samples: [
          {
            name: 'Character Set',
            component: 'AlphabetSample'
          },
          {
            name: 'Sentence',
            component: 'SentenceSample'
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
        'getCustomSample',
        'getGlobalFontSize',
        'getFontCategories',
        'getFontCount',
        'getFontSample',
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
      updateSampleType(sampleType) {
        // if sampletype is "ParagraphSample" reset the global font size
        if (sampleType === 'ParagraphSample') {
          this.$store.dispatch('updateGlobalFontSize', 18)
        }
        this.$store.dispatch('updateFontSample', sampleType)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .sample-control {
    position: sticky;
    top: 0;
    display: flex;
    align-items: center;
    padding: 10px 30px;
    background: #fff;
    border-bottom: 1px solid #d3d3d3;
    z-index: 1;

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
      height: 29px;
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
</style>
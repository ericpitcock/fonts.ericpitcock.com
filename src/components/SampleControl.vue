<template>
  <div class="sample-control">
    <span class="sample-control__font-count">
      {{ fontCount }}
    </span>
    <!-- <div class="sample-control__sample-type"> -->
    <!-- <div
        v-for="(sampleType, index) in samples"
        :key="index"
        :class="[
        'sample-type__button',
        { 'sample-type__button--active': getFontSample == sampleType.component }
      ]"
        @click="updateSampleType(sampleType.component)">
        {{ sampleType.name }}
      </div> -->
    <div class="sample-control__input">
      <input
        class="custom-sample-input"
        v-model="sentenceSample"
        type="text"
        placeholder="Enter your own words">
    </div>
    <!-- </div> -->
    <div class="sample-control__font-size">
      <input name="font-size" type="range" min="12" max="120"
        v-model="fontSize" step="1">
      <label for="font-size">{{ fontSize }}px</label>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'SampleControl',
    // data() {
    //   return {
    //     samples: [
    //       {
    //         name: 'Sentence',
    //         component: 'SentenceSample'
    //       },
    //       {
    //         name: 'Paragraph',
    //         component: 'ParagraphSample'
    //       },
    //       {
    //         name: 'Character Set',
    //         component: 'AlphabetSample'
    //       },
    //     ]
    //   }
    // },
    computed: {
      ...mapGetters([
        'getActiveFonts',
        'getCategoryFilter',
        // 'getCustomSample',
        'getGlobalFontSize',
        'getFontCategories',
        'getFontCount',
        'getFontSample',
        // 'getRecommendedOnly',
        'getSentenceSample',
      ]),
      sentenceSample: {
        get() {
          return this.getSentenceSample
        },
        set(value) {
          this.$store.dispatch('updateSentenceSample', value)
        }
      },
      fontCount() {
        return `${this.getFontCount} ${this.getFontCount === 1 ? 'font' : 'fonts'}`
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
      // customFocus() {
      //   this.$store.dispatch('updateFontSample', 'CustomSample')
      // },
      // updateSampleType(sampleType) {
      //   // if sampletype is "ParagraphSample" reset the global font size
      //   if (sampleType === 'ParagraphSample') {
      //     this.$store.dispatch('updateGlobalFontSize', 18)
      //   }
      //   if (sampleType === 'AlphabetSample') {
      //     this.$store.dispatch('updateGlobalFontSize', 36)
      //   }
      //   this.$store.dispatch('updateFontSample', sampleType)
      // }
    }
  }
</script>

<style lang="scss" scoped>
  .sample-control {
    position: sticky;
    top: 0;
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 30px 30px 30px 60px;
    background: #fff;
    border-bottom: 1px solid #d3d3d3;
    z-index: 1;

    &__font-count {
      flex: 0 1 100px;
    }

    &__input {
      flex: 1 1 auto;
    }

    &__font-size {
      flex: 0 1 100px;
      display: flex;
      align-items: center;

      // margin-left: 20px;
      label {
        margin-left: 10px;
      }
    }

    // &__sample-type {
    //   display: flex;
    //   align-items: center;
    //   // margin-left: 20px;
    // }
    // .sample-type__button {
    //   display: flex;
    //   align-items: center;
    //   height: 29px;
    //   padding: 3px 10px 0 10px;
    //   border: 1px solid #e6e6e6;
    //   font-size: 11px;
    //   &:hover:not(.sample-control__button--active) {
    //     background: lighten(yellow, 40%);
    //     cursor: pointer;
    //   }
    //   &--active {
    //     background: yellow;
    //   }
    //   & + & {
    //     border-left: none;
    //   }
    //   &:first-child {
    //     padding-left: 15px;
    //     border-radius: 15px 0 0 15px;
    //   }
    // }
    .custom-sample-input {
      width: 100%;
      // height: 29px;
      padding: 12px 0 10px 15px;
      background: #f9f9f9;
      border: 1px solid #d3d3d3;
      // border-left: none;
      border-radius: 6px;

      // font-size: 11px;
      &:hover {
        // background: lighten(yellow, 40%);
        // cursor: pointer;
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

    // .font-size-slider {
    //   display: flex;
    //   align-items: center;
    //   // margin-left: 20px;
    //   label {
    //     margin-left: 10px;
    //   }
    // }
    input[type="range"] {
      -webkit-appearance: none;
      /* Remove default styling on WebKit browsers */
      // width: 100%;
      // margin: 10px 0;
    }

    input[type="range"]:focus {
      outline: none;
      /* Remove the default focus style on some browsers */
    }

    input[type="range"]::-webkit-slider-runnable-track {
      width: 100%;
      height: 5px;
      cursor: pointer;
      background: #ddd;
      /* Track background color */
      border-radius: 2px;
    }

    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      /* Remove the default thumb appearance on WebKit browsers */
      width: 16px;
      height: 16px;
      cursor: pointer;
      background: black;
      /* Thumb color */
      border-radius: 50%;
      margin-top: -5px;
    }

    input[type="range"]:focus::-webkit-slider-runnable-track {
      // background: #ccc;
      /* Track background color on focus */
    }
  }
</style>
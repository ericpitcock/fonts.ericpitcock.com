<template>
  <div class="sample-control">
    <span class="sample-control__font-count">
      {{ fontCount }}
    </span>
    <div class="sample-control__input">
      <input
        class="custom-sample-input"
        v-model="sentenceSample"
        type="text"
        placeholder="Enter your own words">
    </div>
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
    computed: {
      ...mapGetters([
        'getActiveFonts',
        'getCategoryFilter',
        'getGlobalFontSize',
        'getFontCategories',
        'getFontCount',
        'getFontSample',
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

      label {
        margin-left: 10px;
      }
    }

    .custom-sample-input {
      width: 100%;
      padding: 12px 0 10px 15px;
      background: #f9f9f9;
      border: 1px solid #d3d3d3;
      border-radius: 6px;

      &:hover {}

      &::placeholder {
        font-size: 11px;
        color: black;
      }

      &:focus {
        background: yellow;
        outline: none;
      }
    }

    input[type="range"] {
      appearance: none;
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
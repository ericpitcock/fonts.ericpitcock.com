<template>
  <div class="sample-control">
    <span class="sample-control__font-count">
      {{ fontCount }}
    </span>
    <div class="sample-control__input">
      <input
        v-model="sentenceSample"
        class="custom-sample-input"
        type="text"
        placeholder="Enter your own words"
      >
    </div>
    <div class="sample-control__font-size">
      <input
        v-model="fontSize"
        name="font-size"
        type="range"
        min="12"
        max="120"
        step="1"
      >
      <label for="font-size">{{ fontSize }}px</label>
    </div>
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()

  // const getActiveFonts = computed(() => store.getters.getActiveFonts)
  // const getCategoryFilter = computed(() => store.getters.getCategoryFilter)
  // const getGlobalFontSize = computed(() => store.getters.getGlobalFontSize)
  // const getFontCategories = computed(() => store.getters.getFontCategories)
  const getFontCount = computed(() => store.getters.getFontCount)
  // const getFontSample = computed(() => store.getters.getFontSample)
  // const getSentenceSample = computed(() => store.getters.getSentenceSample)

  const sentenceSample = computed({
    get() {
      return store.getters.getSentenceSample
    },
    set(value) {
      store.dispatch('updateSentenceSample', value)
    }
  })

  const fontCount = computed(() =>
    `${getFontCount.value} ${getFontCount.value === 1 ? 'font' : 'fonts'}`
  )

  const fontSize = computed({
    get() {
      return store.getters.getGlobalFontSize
    },
    set(value) {
      store.dispatch('updateGlobalFontSize', value)
    }
  })
</script>

<style lang="scss" scoped>
  .sample-control {
    position: sticky;
    top: 0;
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 30px 30px 30px 60px;
    background: var(--interface-surface);
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
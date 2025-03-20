<template>
  <div class="sample-control">
    <!-- <ep-item-count
      :count="getFontCount"
      singular="font"
      plural="fonts"
    /> -->
    <div class="sample-control__input">
      <ep-input
        v-model="sentenceSample"
        size="large"
        class="custom-sample-input"
        type="text"
        placeholder="Enter your own words"
      />
    </div>
    <div class="sample-control__font-size">
      <input
        v-model="fontSize"
        class="font-size-input"
        name="font-size"
        type="range"
        min="12"
        max="120"
        step="1"
      >
      <label for="font-size">{{ fontSize }}px</label>
    </div>
    <ep-theme-toggle
      class="app-header-button ep-button-var--ghost"
      :current-theme="theme"
      @toggle-theme="toggleTheme"
    />
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
  // const getFontCount = computed(() => store.getters.getFontCount)
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

  const fontSize = computed({
    get() {
      return store.getters.getGlobalFontSize
    },
    set(value) {
      store.dispatch('updateGlobalFontSize', value)
    }
  })

  const toggleTheme = () => store.dispatch('toggleTheme')
  const theme = computed(() => store.state.theme)
</script>

<style lang="scss" scoped>
  .sample-control {
    height: 100%;
    display: flex;
    align-items: center;
    gap: 2rem;
    padding: 0 6rem;
    background: var(--interface-surface);
    border-bottom: 0.1rem solid var(--border-color);
  }

  .sample-control__font-count {
    flex: 0 0 10rem;
  }

  .sample-control__input {
    flex: 0 1 60rem;
  }

  .sample-control__font-size {
    flex: 0 0 20rem;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  input[type="range"] {
    appearance: none;
  }

  input[type="range"]:focus {
    outline: none;
  }

  // range input track styles
  @mixin track-styles {
    height: 0.4rem;
    cursor: pointer;
    background: var(--border-color);
    border-radius: 0.2rem;
  }

  input[type="range"]::-webkit-slider-runnable-track {
    @include track-styles;
  }

  input[type="range"]::-moz-range-track {
    @include track-styles;
  }

  input[type="range"]::-ms-track {
    @include track-styles;
  }

  // range input thumb styles
  @mixin thumb-styles {
    width: 1.8rem;
    height: 1.8rem;
    cursor: pointer;
    background: var(--primary-color);
    border: 0.2rem solid var(--interface-surface);
    border-radius: 50%;
  }

  input[type="range"] {
    appearance: none;

    &::-webkit-slider-thumb {
      @include thumb-styles;
      -webkit-appearance: none;
      margin-top: -0.7rem;
    }

    &::-moz-range-thumb {
      @include thumb-styles;
      width: 1.8rem !important;
      height: 1.8rem !important;
      box-sizing: border-box;
    }

    &::-ms-thumb {
      @include thumb-styles;
    }
  }

  input[type="range"]:focus::-webkit-slider-runnable-track {
    // background: #ccc;
    /* Track background color on focus */
  }

  .app-header-button {
    margin-left: auto;
  }
</style>
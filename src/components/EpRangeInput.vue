<template>
  <div class="ep-range-input font-family--calling-code">
    <input
      v-model="modelValue"
      type="range"
      :min="min"
      :max="max"
      :step="step"
    >
    <label>{{ modelValue }}{{ unit }}</label>
  </div>
</template>

<script setup>
  const { min, max, step } = defineProps({
    min: { type: [Number, String], default: 12 },
    max: { type: [Number, String], default: 120 },
    step: { type: [Number, String], default: 1 },
    unit: { type: String, default: 'px' }
  })

  const modelValue = defineModel({
    type: [Number, String],
    default: 16
  })
</script>

<style lang="scss" scoped>
  .ep-range-input {
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

  @mixin thumb-styles {
    width: 1.8rem;
    height: 1.8rem;
    cursor: pointer;
    background: var(--primary-color-base);
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
  }
</style>
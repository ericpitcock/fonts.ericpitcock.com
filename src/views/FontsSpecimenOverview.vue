<template>
  <ep-flex class="fonts-specimen-overview flex-col gap-100">
    <ep-flex class="gap-30">
      <div class="font-family">
        <h1>{{ font.family }}</h1>
      </div>
      <ep-flex class="font-variants flex-col gap-20">
        <h1
          v-for="(variant, index) in variants"
          :key="index"
          :style="{
            fontWeight: variant.value,
            fontVariationSettings: `'wght' ${variant.value}`
          }"
        >
          <span>{{ variant.name }}</span>
          <span
            v-if="variant.italic()"
            style="font-style: italic; color: var(--text-color--subtle)"
          >
            Italic
          </span>
        </h1>
      </ep-flex>
    </ep-flex>
    <char-set-sample />
  </ep-flex>
</template>

<script setup>
  import { useStore } from 'vuex'

  import CharSetSample from '@/components/samples/CharSetSample.vue'

  const props = defineProps({
    font: {
      type: Object,
      required: true
    }
  })

  const store = useStore()
  const weightMap = store.state.weightMap

  const variants = props.font.variants
    .filter(variant => !variant.includes('italic'))
    .map(variant => ({
      name: weightMap[variant],
      value: variant,
      italic: () => {
        if (props.font.variants.includes(`${variant}italic`)) {
          return true
        } else if (variant === 'regular' && props.font.variants.includes('italic')) {
          return true
        } else {
          return false
        }
      }
    }))
</script>

<style lang="scss" scoped>
  .fonts-specimen-overview {
    padding: 10rem 10rem 20rem 10rem;
    background: var(--interface-surface);
  }

  h1 {
    font-size: 6rem;
    color: var(--text-color--loud);
    text-box-trim: trim-both;
    text-box-edge: cap alphabetic;
  }
</style>
<template>
  <div :class="['fonts-card-layout', layoutClass]">
    <font-card
      v-for="(font) in fonts"
      :key="font.family"
      :font="font"
      @click="onFontCardClick(font)"
    />
  </div>
</template>

<script setup>
  import { computed } from 'vue'

  import FontCard from '@/components/FontCard.vue'

  const props = defineProps({
    fonts: {
      type: Array,
      required: true,
    },
    view: {
      type: String,
      default: 'list',
    },
  })

  const layoutClass = computed(() => {
    return `fonts-card-layout--${props.view}`
  })

  const emit = defineEmits(['click'])

  const onFontCardClick = (font) => {
    emit('click', font)
  }
</script>

<style lang="scss" scoped>
  .fonts-card-layout {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .fonts-card-layout--cards {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(auto-fill, 30rem);
    justify-content: start;
    padding: 3rem;

    .font-card {
      flex: 1;
      padding: 3rem;
      border: 0.1rem solid var(--border-color);
      border-radius: var(--border-radius--large);

      :deep(.font) {
        padding: 0;
      }
    }
  }
</style>
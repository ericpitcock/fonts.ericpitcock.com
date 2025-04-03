<template>
  <div class="sentence-sample">
    {{ sentenceSample }}
  </div>
</template>

<script setup>
  import { computed } from 'vue'

  import { useFontsStore } from '@/store/fontsStore'

  const fontsStore = useFontsStore()
  const sentenceSample = computed(() => fontsStore.sentenceSample)
</script>

<style lang="scss" scoped>
  .sentence-sample {
    color: var(--text-color--loud);
    line-height: 1.2;
  }

  @container fontcard (width > 300px) {
    .sentence-sample {
      white-space: nowrap;
      line-height: normal;
    }
  }
</style>

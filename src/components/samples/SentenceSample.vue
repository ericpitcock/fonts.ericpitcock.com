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

<style>
  .sentence-sample {
    color: var(--text-color--loud);
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding-left: 6rem;
  }
</style>

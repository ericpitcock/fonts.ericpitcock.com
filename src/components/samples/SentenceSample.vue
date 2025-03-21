<template>
  <div class="sentence-sample">
    {{ sentenceSample }}
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()
  const sentenceSample = computed(() => store.state.sentenceSample)
</script>

<style>
  .sentence-sample {
    color: var(--text-color--loud);
  }
</style>

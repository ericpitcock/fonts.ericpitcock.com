<template>
  <div class="sentence-sample">
    {{ sentenceSample }}
  </div>
</template>

<script setup>
  import { useStore } from 'vuex'

  const store = useStore()
  const { sentenceSample } = store.state
</script>

<style>
  .sentence-sample {
    color: var(--text-color--loud);
  }
</style>

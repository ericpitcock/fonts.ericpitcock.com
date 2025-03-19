<template>
  <div class="custom-sample">{{ getCustomSample }}</div>
</template>

<script setup>
  import { computed } from 'vue'
  import { useStore } from 'vuex'

  // Store access
  const store = useStore()

  // Getters
  const getCustomSample = computed(() => store.getters.getCustomSample)
</script>

<style>
  .custom-sample {}
</style>
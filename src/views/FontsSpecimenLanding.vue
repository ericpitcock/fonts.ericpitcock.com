<template>
  <h1>{{ font.family }}</h1>
</template>

<script setup>
  defineProps({
    font: {
      type: Object,
      required: true
    }
  })
</script>

<style scoped>
  h1 {
    font-size: 6rem;
    color: var(--text-color--loud);
    /* text-box: cap alphabetic; */
    text-box-trim: trim-both;
    text-box-edge: cap alphabetic;
  }
</style>
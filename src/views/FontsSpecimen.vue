<template>
  <fonts-layout :style="{ fontFamily: font.family }">
    <template #sidebar>
      <fonts-specimen-details :font="font" />
    </template>
    <template #main>
      <div class="specimen">
        <paragraph-sample />
        <alphabet-sample />
        <table-sample />
      </div>
    </template>
  </fonts-layout>
</template>

<script setup>
  import FontsSpecimenDetails from '@/components/FontsSpecimenDetails.vue'
  import AlphabetSample from '@/components/samples/AlphabetSample.vue'
  import ParagraphSample from '@/components/samples/ParagraphSample.vue'
  import TableSample from '@/components/samples/TableSample.vue'
  import FontsLayout from '@/layouts/FontsLayout.vue'

  defineProps({
    font: {
      type: Object,
      required: true
    }
  })
</script>

<style lang="scss" scoped>
  .specimen {
    display: flex;
    flex-direction: column;
    gap: 10rem;
    padding: 6rem;
    // background: var(--interface-surface);
  }
</style>
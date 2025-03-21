<template>
  <div class="specimen">
    <div class="container">
      <div class="content">
        <pre>font: {{ font.family }}</pre>
        <TableSample />
      </div>
    </div>
  </div>
</template>

<script setup>
  import TableSample from '@/components/samples/TableSample.vue'

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

    .right {
      flex: 1 1 auto;
      margin-left: 30px;
    }
  }
</style>
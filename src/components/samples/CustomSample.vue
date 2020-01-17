<template>
  <div class="custom-sample">{{ getCustomSample }}</div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'CustomSample',
    computed: {
      ...mapGetters([
        'getCustomSample'
      ])
    }
  }
</script>

<style>
  .custom-sample {
    /* font-size: 40px; */
  }
</style>
<template>
  <!-- <div class="custom-sample">{{ getCustomSample }}</div> -->
  <div class="custom-sample">The quick brown fox jumps over the lazy dog</div>
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
    font-size: 40px;
  }
</style>
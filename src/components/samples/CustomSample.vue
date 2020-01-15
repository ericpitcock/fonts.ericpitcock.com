<template>
  <div>{{ getCustomSample }}</div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'CustomSample',
    computed: {
      ...mapGetters([
        'getCustomSample'
      ])
    },
  }
</script>

<style>

</style>
<template>
  <div
    class="specimen"
    :style="{ fontFamily: font.family }"
  >
    {{ font }}
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Specimen',
    computed: {
      ...mapGetters({
        font: 'getCurrentSpecimen'
    })
    }
  }
</script>

<style>

</style>
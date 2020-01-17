<template>
  <div
    class="specimen"
    :style="{ fontFamily: font.family }"
  >
    <TableSample />
  </div>
</template>

<script>
  import TableSample from '@/components/samples/TableSample'
  import { mapGetters } from 'vuex'

  export default {
    name: 'Specimen',
    components: {
      TableSample
    },
    computed: {
      ...mapGetters({
        font: 'getCurrentSpecimen'
    })
    }
  }
</script>

<style>

</style>
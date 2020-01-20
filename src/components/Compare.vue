<template>
  <div class="compare">
    <FontContainer
      v-for="(font, index) in getCompare"
      :key="index"
      :font="font"
    />
  </div>
</template>

<script>
  import FontContainer from '@/components/FontContainer'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'Compare',
    components: {
      FontContainer
    },
    computed: {
      ...mapGetters([
        'getCompare'
      ])
    }
  }
</script>

<style>
  .compare {
    position: sticky;
    top: 130px;
    z-index: 1;
    background: #fff;
    margin-bottom: 100px;
  }
</style>
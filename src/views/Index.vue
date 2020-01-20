<template>
  <div class="content index">
    <Compare v-if="getCompare.length >= 1" />
    <FontContainer
      v-for="(font, index) in getActiveFonts"
      :key="index"
      :font="font"
    />
  </div>
</template>

<script>
  import Compare from '@/components/Compare'
  import FontContainer from '@/components/FontContainer'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'Index',
    components: {
      Compare,
      FontContainer
    },
    data() {
      return {

      }
    },
    computed: {
      ...mapGetters([
        'getActiveFonts',
        'getCompare'
      ])
    }
  }
</script>

<style lang="scss">

</style>

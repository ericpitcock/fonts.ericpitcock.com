<template>
  <div class="index">
    <FontContainer
      v-for="(font, index) in getActiveFonts"
      :key="index"
      :font="font"
    />
  </div>
</template>

<script>
  import FontContainer from '@/components/FontContainer'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'Index',
    components: {
      FontContainer
    },
    data() {
      return {

      }
    },
    computed: {
      ...mapGetters([
        'getActiveFonts'
      ])
    }
  }
</script>

<style lang="scss">

</style>

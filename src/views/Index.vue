<template>
  <div class="index">
    <Compare v-if="getCompare.length >= 1" />
    <div class="container">
      <div class="content">
        <FontContainer
          v-for="(font, index) in getActiveFonts"
          :key="index"
          :font="font"
        />
      </div>
    </div>
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
    },
    mounted() {
      // console.log(this.$store.getters.getGoogleFonts)
    }
  }
</script>

<style lang="scss">
  .index {
    display: flex;
    flex-direction: column;
    align-items: center;
    & > .container .content {
      padding: 30px 0 100px 0;
    }
  }
</style>

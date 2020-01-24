<template>
  <div class="index">
    <Compare v-if="getCompare.length >= 1" />
    <div class="container">
      <div class="content">
        <template v-for="(font, index) in getActiveFonts">
        <FontContainer
          v-if="inCompare(font)"
          :key="index"
          :font="font"
        />
        </template>
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
        'getCompare',
        'getCompareFontList'
      ])
    },
    methods: {
      inCompare(font) {
        return (!this.getCompareFontList.includes(font.family))
      }
    }
  }
</script>

<style lang="scss">
  .index {
    display: flex;
    flex-direction: column;
    align-items: center;
    & > .container .content {
      padding: 0 0 100px 0;
    }
  }
</style>

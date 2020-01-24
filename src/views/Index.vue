<template>
  <div class="index">
    <Compare v-if="getCompare.length >= 1" />
    <div class="container">
      <div class="content">
        <template v-for="(font, index) in getActiveFonts">
        <Font
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
  import Font from '@/components/Font'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'Index',
    components: {
      Compare,
      Font
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

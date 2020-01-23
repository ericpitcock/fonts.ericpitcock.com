<template>
  <div class="font-info">
    <div class="font-info__name">
      <span>{{ font.family }}</span>
    </div>
    <div class="font-info__styles">
      <span>{{ fontInfo(font) }}</span>
    </div>
    <div v-if="isRecommended(font)" class="font-info__recommended-flag">
      Recommended
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'FontInfo',
    props: ['font'],
    computed: {
      ...mapGetters([
        'getRecommendedFonts'
      ])
    },
    methods: {
      isRecommended(font) {
        return this.getRecommendedFonts.includes(font.family)
      },
      fontInfo(font) {
        let label = font.variants.length > 1 ? 'weights' : 'weight'
        // if it doesn't have italics
        if (!font.variants.includes('italic')) {
          return `${font.variants.length} ${label}`
        } else {
          let italicCount = 0
          font.variants.forEach(variant => {
            if (variant.includes('italic')) { italicCount++ }
          })
          return `${font.variants.length - italicCount} ${label} w/ italics`
        }
      }
    }
  }
</script>

<style lang="scss">
  .font-info {
    flex: 0 0 200px;
    &__name {
      flex: 0 0 30px;
      display: flex;
      align-items: center;
      color: blue;
    }
    &__styles {
      flex: 0 0 30px;
      display: flex;
      align-items: center;
      color: gray;
      font-size: 12px;
      margin-top: 10px;
    }
    &__recommended-flag {
      display: inline-block;
      padding: 4px 5px 1px 5px;
      border: 1px solid lighten(red, 40%);
      border-radius: 3px;
      font-size: 11px;
      color: rebeccapurple;
      background: lighten(yellow, 40%);
      margin-top: 20px;
    }
  }
</style>
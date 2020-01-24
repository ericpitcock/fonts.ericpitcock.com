<template>
  <div class="paragraph-sample" :style="{ lineHeight: `${getGlobalFontSize * 1.3}px` }">
    {{ getParagraph() }}
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  var Chance = require('chance')

  export default {
    name: 'ParagraphSample',
    computed: {
      ...mapGetters([
        'getGlobalFontSize'
      ])
    },
    methods: {
      getParagraph() {
        return chance.paragraph({ sentences: 3 })
      }
    }
  }
</script>

<style>
  .paragraph-sample {
  }
</style>
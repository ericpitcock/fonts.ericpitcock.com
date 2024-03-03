<template>
  <div class="paragraph-sample">{{ getParagraph() }}</div>
</template>

<script>
  var Chance = require('chance')

  export default {
    name: 'ParagraphSample',
    methods: {
      getParagraph() {
        return chance.paragraph({ sentences: 3 })
      }
    }
  }
</script>

<style>
  .paragraph-sample {
    max-width: 600px;
    /* font-size: 18px;
    line-height: 24px; */
  }
</style>
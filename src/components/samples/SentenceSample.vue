<template>
  <div class="sentence-sample">The quick brown fox jumps over the lazy dog</div>
</template>

<script>
  var Chance = require('chance')

  export default {
    name: 'SentenceSample',
    methods: {
      getSentence() {
        return chance.sentence({ words: 7 })
      }
    }
  }
</script>

<style>
  .sentence-sample {
    /* font-size: 40px; */
  }
</style>
<template>
  <div class="font-name-sample">{{ getSentence() }}</div>
</template>

<script>
  var Chance = require('chance')

  export default {
    name: 'FontNameSample',
    methods: {
      getSentence() {
        return chance.sentence({ words: 7 })
      }
    }
  }
</script>

<style>
  .font-name-sample {
    font-size: 40px;
  }
</style>
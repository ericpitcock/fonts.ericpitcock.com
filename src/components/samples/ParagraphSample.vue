<template>
  <div class="paragraph-sample">Within the realm of written expression, a
    typeface silently narrates a story. Each character, meticulously
    designed, engages in a dance of form and negative space. The clean lines and
    balanced curves together create a visual composition, inviting readers into
    a world where clarity converges with artistic nuance. From headlines to
    paragraphs, an adaptable typeface effortlessly caters to both legibility
    and subtle individuality. As the text unfolds, the typeface transforms into
    more than letters—it embodies an aesthetic journey, a visual exploration
    within the language it inhabits.</div>
</template>

<script>
  var Chance = require('chance')

  export default {
    name: 'ParagraphSample',
    methods: {
      // getParagraph() {
      //   return chance.paragraph({ sentences: 3 })
      // }
    }
  }
</script>

<style>
  .paragraph-sample {
    max-width: 600px;
    line-height: 1.5;
    /* font-size: 18px;
    line-height: 24px; */
  }
</style>
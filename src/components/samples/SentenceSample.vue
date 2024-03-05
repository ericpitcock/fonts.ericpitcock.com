<template>
  <div
    class="sentence-sample"
    ref="sentenceSample"
    @click="handleClick">
    {{ getSentenceSample }}
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'SentenceSample',
    computed: {
      ...mapGetters(['getSentenceSample'])
    },
    methods: {
      handleClick() {
        this.$emit('sentence-click')
      }
    }
    // methods: {
    //   ...mapActions(['updateSentenceSample']),
    //   handleBlur() {
    //     // if the sentenceSample is empty, add the default text
    //     if (this.$refs.sentenceSample.innerText === '') {
    //       // update ref="sentenceSample" with default text
    //       this.$refs.sentenceSample.innerText = this.$store.state.sentenceSampleDefault
    //       this.updateSentenceSample(this.$store.state.sentenceSampleDefault)
    //     }
    //   },
    //   handleInput(text) {
    //     this.updateSentenceSample(text.innerText)
    //   },
    //   clearText() {
    //     this.$refs.sentenceSample.innerText = ''
    //   },
    //   highlightText(target) {
    //     target.focus()
    //     const range = document.createRange()
    //     range.selectNodeContents(target)
    //     const sel = window.getSelection()
    //     sel.removeAllRanges()
    //     sel.addRange(range)
    //   },
    // }
  }
</script>

<style>
  .sentence-sample {
    /* Add your styles here */
  }
</style>

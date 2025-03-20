<template>
  <div
    ref="sentenceSample"
    class="sentence-sample"
    @click="onClick"
  >
    {{ getSentenceSample }}
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'SentenceSample',
    emits: ['click'],
    computed: {
      ...mapGetters(['getSentenceSample'])
    },
    methods: {
      onClick() {
        this.$emit('click')
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
    color: var(--text-color--loud);
  }
</style>

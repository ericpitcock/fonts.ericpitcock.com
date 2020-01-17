<template>
  <div
    class="specimen"
    :style="{ fontFamily: thisfont.family }"
  >
    {{ thisfont }}
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Specimen',
    props: ['font'],
    computed: {
      ...mapGetters([
        'getGoogleFonts'
      ]),
      thisfont() {
        let thisfont = this.getGoogleFonts.filter(font => font.family == this.font)
        return thisfont[0]
      }
    }
  }
</script>

<style>

</style>
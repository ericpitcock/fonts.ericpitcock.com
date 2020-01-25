<template>
  <div class="specimen">
    <div class="container">
      <div class="content">
        <!-- <pre>{{ font }}</pre> -->
        <FontInfo :font="font" />
        <div class="right" :style='{ fontFamily: font.family }'>
          <!-- <h1>{{ quote.message }}</h1>
          <div>{{ quote.author }}</div> -->
          <h1
            v-for="(variant, index) in fontVariants()"
            :key="index"
            :style="{ fontWeight: variant.weight, fontStyle: variant.style }"
          >
            This is a variant
          </h1>
          <!-- <pre>{{ font }}</pre> -->
          <!-- <pre>{{ fontVariants() }}</pre> -->
          <TableSample />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import FontInfo from '@/components/FontInfo'
  import TableSample from '@/components/samples/TableSample'
  import { mapGetters } from 'vuex'
  import WebFont from 'webfontloader'

  export default {
    name: 'Specimen',
    components: {
      FontInfo,
      TableSample
    },
    data() {
      return {
        quote: {}
      }
    },
    computed: {
      ...mapGetters([
        'getGoogleFonts',
        'getCurrentSpecimen'
      ]),
      font() {
        return this.getGoogleFonts.find(font => font.family.toUpperCase() == this.getCurrentSpecimen.toUpperCase())
      }
    },
    methods: {
      loadFont(font) {
        let fontStack = `${font.family}:${font.variants.join(',')}`
        WebFont.load({
          google: {
            //families: ['Open Sans:300,400,700']
            families: [fontStack]
          },
          classes: false,
          loading: () => {
          },
          active: () => {
          },
          inactive: () => {
          },
          fontloading: (familyName, fvd) => {
            this.loading = true
            // console.log(`fontloading: ${familyName}`)
          },
          fontactive: (familyName, fvd) => {
            this.loading = false
            // console.log(`fontactive: ${familyName}`)
          },
          fontinactive: (familyName, fvd) => {
            this.loading = false
            this.error = true
            // console.log(`fontinactive: ${familyName}`)
          }
        })
      },
      fontVariants() {
        // "variants": [
        //   "200",
        //   "200italic",
        //   "300",
        //   "300italic",
        //   "regular",
        //   "italic",
        //   "500",
        //   "500italic",
        //   "600",
        //   "600italic",
        //   "700",
        //   "700italic"
        // ]
        // let variants = font.variants
        let variantsArray = []
        this.font.variants.forEach(variant => {
          if (variant.includes('italic')) {
            // remove weight
            variantsArray.push({
              weight: variant.substring(0, 3),
              style: 'italic'
            })
          } else {
            variantsArray.push({
              weight: variant,
              style: 'normal'
            })
          }
        })
        return variantsArray
      }
      // fetchQuotes() {
      //   fetch('https://150000-quotes.p.rapidapi.com/random', {
      //     'method': 'GET',
      //     'headers': {
      //       'x-rapidapi-host': '150000-quotes.p.rapidapi.com',
      //       'x-rapidapi-key': '601750e6efmshb80847227ae1df3p14769bjsnf01cb50c17da'
      //     }
      //   })
      //   .then(response => {
      //     response.json().then(data => {
      //       this.quote = data
      //     });
      //   })
      // }
    },
    mounted() {
      this.loadFont(this.font)
      // console.log(this.font)
      console.log(this.fontVariants())
    }
  }
</script>

<style lang="scss">
  .specimen {
    display: flex;
    .right {
      flex: 1 1 auto;
      // align-self: center;
      margin-left: 30px;
    }
  }
  h1 {
    font-size: 40px;
  }
</style>
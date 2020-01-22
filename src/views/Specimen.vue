<template>
  <div class="specimen">
    <div class="container">
      <div class="content">
        <FontInfo :font="font" />
        <div class="right" :style='{ fontFamily: font.family }'>
          <h1>{{ quote.message }}</h1>
          <div>{{ quote.author }}</div>
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
      ...mapGetters({
        font: 'getCurrentSpecimen'
      })
    },
    methods: {
      fetchQuotes() {
        fetch('https://150000-quotes.p.rapidapi.com/random', {
          'method': 'GET',
          'headers': {
            'x-rapidapi-host': '150000-quotes.p.rapidapi.com',
            'x-rapidapi-key': '601750e6efmshb80847227ae1df3p14769bjsnf01cb50c17da'
          }
        })
        .then(response => {
          response.json().then(data => {
            this.quote = data
          });
        })
      }
    },
    mounted() {
      this.fetchQuotes()
      console.log(this.quote)
      
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
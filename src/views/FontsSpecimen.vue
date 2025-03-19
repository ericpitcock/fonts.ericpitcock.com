<template>
  <div class="specimen">
    <div class="container">
      <div class="content">
        <pre>font: {{ fontt }}</pre>
        <!-- <FontInfo :font="fontt" />
        <div class="right" :style='{ fontFamily: fontt.family }'>
          <h1>{{ quote.message }}</h1>
          <div>{{ quote.author }}</div>
        </div> -->
        <TableSample />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed, onMounted, ref } from 'vue'
  import { useStore } from 'vuex'

  import FontInfo from '@/components/FontInfo.vue'
  import TableSample from '@/components/samples/TableSample.vue'

  // Define props
  const props = defineProps(['font'])

  // Store access
  const store = useStore()

  // Data properties
  const quote = ref({})

  // Computed properties
  const fontt = computed(() => {
    return store.getters.getFontFromSlug(props.font)
  })

  // Methods
  // const fetchQuotes = () => {
  //   fetch('https://150000-quotes.p.rapidapi.com/random', {
  //     'method': 'GET',
  //     'headers': {
  //       'x-rapidapi-host': '150000-quotes.p.rapidapi.com',
  //       'x-rapidapi-key': '601750e6efmshb80847227ae1df3p14769bjsnf01cb50c17da'
  //     }
  //   })
  //   .then(response => {
  //     response.json().then(data => {
  //       quote.value = data
  //     });
  //   })
  // }

  // Lifecycle hooks
  onMounted(() => {
    // fetchQuotes()
    console.log(fontt.value)
    // console.log(store.getters.getGoogleFonts)
  })
</script>

<style lang="scss">
  .specimen {
    display: flex;

    .right {
      flex: 1 1 auto;
      margin-left: 30px;
    }
  }

  h1 {
    font-size: 40px;
  }
</style>
<template>
  <div class="specimen">
    <div class="container">
      <div class="content">
        <pre>font: {{ font.family }}</pre>
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
  // import { computed } from 'vue'
  // import { useStore } from 'vuex'

  // import FontInfo from '@/components/FontInfo.vue'
  import TableSample from '@/components/samples/TableSample.vue'

  defineProps({
    font: {
      type: Object,
      required: true
    }
  })

  // const store = useStore()

  // const font = computed(() => {
  //   return store.state.currentSpecimen
  // })

  // onMounted(() => {
  //   console.log(fontt.value)
  // })
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
<template>
  <fonts-text-sample
    element="h1"
    :font="font"
    :text="headline"
  />
</template>

<script setup>
  import { faker } from '@faker-js/faker'
  import { computed } from 'vue'
  import { useStore } from 'vuex'

  import FontsTextSample from '@/components/samples/FontsTextSample.vue'

  defineProps({
    font: {
      type: Object,
      required: true
    }
  })

  const store = useStore()
  const headlines = computed(() => store.state.headlines)
  const headline = faker.helpers.arrayElement(headlines.value)
</script>
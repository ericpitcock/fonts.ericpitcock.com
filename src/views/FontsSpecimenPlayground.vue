<template>
  <ep-flex class="flex-col gap-40">
    <fonts-text-sample
      element="h1"
      :font="font"
      :text="headline"
      :initial-size="48"
      initial-weight="400"
    />
    <fonts-text-sample
      element="p"
      :font="font"
      :text="paragraph"
      :initial-size="20"
      initial-weight="400"
    />
  </ep-flex>
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

  const paragraph = faker.lorem.paragraphs(5)
</script>
<template>
  <header>
    <ep-flex class="flex-col gap-30">
      <ep-button
        to="/"
        label="Back to index"
      />
      <div>{{ font.family }}</div>
      <div class="variants">
        <h3>Weights</h3>
        <ep-flex class="flex-col gap-10">
          <div
            v-for="(variant, index) in font.variants"
            :key="index"
          >
            <div @mouseover="onWeightHover">
              {{ weightMap[variant] }}
            </div>
          </div>
        </ep-flex>
      </div>
    </ep-flex>
  </header>
</template>

<script setup>
  import { useStore } from 'vuex'

  defineProps({
    font: {
      type: Object,
      required: true
    }
  })

  const emit = defineEmits(['weight-hover'])

  const store = useStore()
  const weightMap = store.state.weightMap

  const onWeightHover = () => {
    emit('weight-hover')
  }
</script>

<style lang="scss" scoped>
  header {
    grid-row: 1;
    grid-column: 1/2;
    display: flex;
    flex-direction: column;
    padding: 3rem;
    // background: var(--interface-surface);
    border-right: 0.1rem solid var(--border-color);
  }
</style>
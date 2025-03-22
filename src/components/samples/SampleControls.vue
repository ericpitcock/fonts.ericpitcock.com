<template>
  <div class="font-controls">
    <label>
      Font Size:
      <input
        type="range"
        :min="minSize"
        :max="maxSize"
        :step="stepSize"
        v-model.number="localSize"
        @input="updateControl"
      />
      {{ localSize }}rem
    </label>
    <label>
      Font Weight:
      <select
        v-model="localWeight"
        @change="updateControl"
      >
        <option
          v-for="weight in availableWeights"
          :key="weight"
          :value="weight"
        >
          {{ weight }}
        </option>
      </select>
    </label>
  </div>
</template>

<script setup>
  import { ref, watch } from 'vue'

  // props allow for default values and dynamic options
  const props = defineProps({
    initialSize: { type: Number, default: 5 },
    initialWeight: { type: String, default: 'regular' },
    availableWeights: {
      type: Array,
      default: () => ['100', '200', '300', 'regular', '500', '600', '700', '800', '900']
    },
    minSize: { type: Number, default: 1 },
    maxSize: { type: Number, default: 10 },
    stepSize: { type: Number, default: 0.1 }
  })

  // emit update event with the current values
  const emit = defineEmits(['update'])

  const localSize = ref(props.initialSize)
  const localWeight = ref(props.initialWeight)

  const updateControl = () => {
    emit('update', { size: localSize.value, weight: localWeight.value })
  }

  // Ensure initial values are emitted
  updateControl()
</script>

<style scoped>
  .font-controls {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  label {
    display: flex;
    flex-direction: column;
    font-size: 1.2rem;
  }
</style>
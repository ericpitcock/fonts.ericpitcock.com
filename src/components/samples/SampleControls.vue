<template>
  <div class="font-controls">
    <label>
      <ep-range-input
        v-model="localSize"
        :min="minSize"
        :max="maxSize"
        :step="stepSize"
      />
    </label>
    <label>
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
  import { computed, ref, watch } from 'vue'

  import EpRangeInput from '@/components/EpRangeInput.vue'

  // props allow for default values and dynamic options
  const props = defineProps({
    initialSize: { type: Number, default: 5 },
    initialWeight: { type: String, default: '400' },
    availableWeights: {
      type: Array,
      default: () => ['100', '200', '300', '400', '500', '600', '700', '800', '900']
    },
    minSize: { type: Number, default: 12 },
    maxSize: { type: Number, default: 64 },
    stepSize: { type: Number, default: 1 }
  })

  // emit update event with the current values
  const emit = defineEmits(['update'])

  const localSize = ref(props.initialSize)

  watch(localSize, () => {
    console.log('localSize', localSize.value)
    emit('update', { size: localSize.value, weight: localWeight.value })
  })

  const localWeight = ref(props.initialWeight)

  const updateControl = () => {
    emit('update', { size: localSize.value, weight: localWeight.value })
  }

  // Ensure initial values are emitted
  // updateControl()
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
<template>
  <ep-flex class="flex-col gap-60">
    <ep-flex
      v-for="(set, index) in characterSet"
      :key="index"
      class="flex-col gap-20"
    >
      <ep-header>
        <template #left>
          <h2 class="ui-heading">
            {{ set.label }}
          </h2>
        </template>
        <template #right>
          <ep-range-input
            v-model="localFontSize"
            :min="24"
            :max="128"
            :step="1"
            unit="px"
          />
        </template>
      </ep-header>
      <div
        class="characters"
        :style="{ fontSize: `${localFontSize}px` }"
      >
        <div
          v-for="(char, index) in set.value"
          :key="index"
          class="character"
        >
          {{ char }}
        </div>
      </div>
    </ep-flex>
  </ep-flex>
</template>

<script setup>
  import { ref } from 'vue'

  import EpRangeInput from '@/components/EpRangeInput.vue'

  const localFontSize = ref(24)

  const characterSet = [
    {
      label: 'Uppercase',
      value: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    },
    {
      label: 'Lowercase',
      value: 'abcdefghijklmnopqrstuvwxyz'
    },
    {
      label: 'Numbers',
      value: '0123456789'
    },
    {
      label: 'Special Characters',
      value: '‘?’“!”(%)[#]{@}/&\\<-+÷×=>®©$€£¥¢:;,.*'
    },
  ]
</script>

<style lang="scss" scoped>
  .characters {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;

    .character {
      flex: none;
      width: 2em;
      height: 2em;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 0.1rem solid var(--border-color);
      border-radius: var(--border-radius--large);
      color: var(--text-color--loud);
    }
  }
</style>

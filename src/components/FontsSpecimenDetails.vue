<template>
  <header>
    <ep-flex class="flex-col gap-30">
      <ep-button
        to="/"
        label="Back to index"
      />
      <div>{{ font.family }}</div>
      <ep-flex class="flex-col gap-10">
        <ep-menu
          :menu-items="specimenMenuItems"
          menu-type="nav"
          :active-item="activeMenuItem"
          @click="onClick"
        />
      </ep-flex>
    </ep-flex>
  </header>
</template>

<script setup>
  import { ref } from 'vue'

  defineProps({
    font: {
      type: Object,
      required: true
    }
  })

  // const emit = defineEmits(['weight-hover'])

  const specimenMenuItems = [
    {
      id: 'specimen',
      label: 'Specimen',
    },
    {
      id: 'ui',
      label: 'User Interface',
    },
    {
      id: 'playground',
      label: 'Playground',
    }
  ]

  const activeMenuItem = ref('specimen')

  const onClick = (item) => {
    console.log(item)
    activeMenuItem.value = item.label
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
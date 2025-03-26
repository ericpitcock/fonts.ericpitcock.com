<template>
  <header>
    <ep-header>
      <template #left>
        <ep-button
          class="ep-button-var--ghost"
          label="Back"
          :icon-left="{ name: 'arrow-left' }"
          @click="$router.push({ path: `/${font.category}` })"
        />
      </template>
      <template #center>
        <ep-tabs
          :items="specimenMenuItems"
          :active-tab-index="activeTab"
          @tab-click="setActiveTab"
        />
      </template>
      <template #right>
        <ep-theme-toggle
          class="app-header-button ep-button-var--ghost"
          :current-theme="theme"
          @toggle-theme="toggleTheme"
        />
      </template>
    </ep-header>
  </header>
</template>

<script setup>
  import { computed, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useStore } from 'vuex'

  const props = defineProps({
    font: {
      type: Object,
      required: true
    },
    initialTab: {
      type: Number,
      default: 0
    }
  })

  const specimenMenuItems = [
    {
      id: 'overview',
      label: 'Overview',
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

  const router = useRouter()

  const activeTab = ref(props.initialTab)

  const setActiveTab = (item) => {
    console.log(item)
    activeTab.value = item.index
    router.push({ query: { tab: item.item.id } })
  }

  const store = useStore()

  const toggleTheme = () => store.dispatch('toggleTheme')
  const theme = computed(() => store.state.theme)
</script>

<style lang="scss" scoped>
  header {
    grid-row: 1;
    grid-column: 1/2;
    // display: flex;
    // flex-direction: column;
    // border-right: 0.1rem solid var(--border-color);
  }

  .ep-header {
    --ep-header-container-padding: 0 2rem 0 1rem;
    --ep-header-container-bg-color: var(--interface-bg);
  }

  .ep-tabs {
    --ep-tabs-active-border-color: var(--primary-color);
  }
</style>
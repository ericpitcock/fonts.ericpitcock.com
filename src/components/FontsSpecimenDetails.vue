<template>
  <fonts-app-header>
    <template #left>
      <ep-button
        class="ep-button-var--ghost"
        :label="backButtonLabel"
        :icon-left="{ name: 'arrow-left' }"
        :to="$route.query.return || '/'"
      />
    </template>
    <template #center>
      <ep-tabs
        :items="specimenMenuItems"
        :active-tab-index="activeTab"
        @tab-click="setActiveTab"
      />
    </template>
  </fonts-app-header>
</template>

<script setup>
  import { computed, ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useStore } from 'vuex'

  import FontsAppHeader from '@/components/FontsAppHeader.vue'

  const store = useStore()

  const categoryMap = store.state.categoryMap

  // back button label computed
  const backButtonLabel = computed(() => {
    // if query starts with "/?" then it's search results
    // otherwise it's a font category and return everything but the /
    const returnPath = route.query.return || '/'
    return returnPath.startsWith('/?') ? 'Search results' : `${categoryMap[returnPath.replace(/^\//, '')]} fonts`
  })

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
  const route = useRoute()

  const activeTab = ref(props.initialTab)

  const setActiveTab = (item) => {
    console.log(item)
    activeTab.value = item.index
    router.push({
      query: {
        ...route.query,
        tab: item.item.id
      }
    })
  }

  watch(() => props.initialTab, (tab) => {
    activeTab.value = tab
  })
</script>

<style lang="scss" scoped>
  .ep-tabs {
    --ep-tabs-active-border-color: var(--primary-color-base);
  }
</style>
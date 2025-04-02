<template>
  <fonts-app-header>
    <template #left>
      <ep-button
        class="ep-button-var--ghost"
        label=""
        :icon-left="{ name: 'close' }"
        @click="onCloseClick"
      />
      <ep-divider direction="vertical" />
      <font-info
        :font="font"
        style="padding-left: 1rem;"
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
  import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  import FontInfo from '@/components/FontInfo.vue'
  import FontsAppHeader from '@/components/FontsAppHeader.vue'
  import { useFontsStore } from '@/store/fontsStore'

  const router = useRouter()
  const route = useRoute()
  const fontsStore = useFontsStore()

  const props = defineProps({
    initialTab: {
      type: Number,
      default: 0
    }
  })

  const font = computed(() => {
    return fontsStore.getCurrentFont(route.query.font)
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

  const activeTab = ref(props.initialTab)

  const setActiveTab = (item) => {
    // console.log(item)
    activeTab.value = item.index
    router.replace({
      query: {
        ...route.query,
        tab: item.item.id
      }
    })
  }

  const onCloseClick = () => {
    router.replace({
      query: {
        ...route.query,
        font: undefined,
        tab: undefined
      }
    })
  }

  const onKeydown = (event) => {
    if (event.key === 'Escape') {
      onCloseClick()
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', onKeydown)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', onKeydown)
  })

  watch(() => props.initialTab, (tab) => {
    activeTab.value = tab
  })
</script>

<style lang="scss" scoped>
  .ep-tabs {
    --ep-tabs-active-border-color: var(--primary-color-base);
  }
</style>
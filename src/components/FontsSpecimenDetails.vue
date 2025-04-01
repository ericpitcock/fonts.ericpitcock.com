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
  import { computed, ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  import FontInfo from '@/components/FontInfo.vue'
  import FontsAppHeader from '@/components/FontsAppHeader.vue'
  import { useFontsStore } from '@/store/fontsStore'

  const router = useRouter()
  const route = useRoute()
  const fontsStore = useFontsStore()

  // Uncomment if needed
  // const categoryMap = fontsStore.categoryMap

  // back button label computed
  // const backButtonLabel = computed(() => {
  //   // if query starts with "/?" then it's search results
  //   // otherwise it's a font category and return everything but the /
  //   let returnPath = route.query.return || '/'
  //   // strip the leading slash and ? and everything after it
  //   // returnPath = returnPath.replace(/^\//, '').replace(/\?.*$/, '')
  //   // if returnPath is empty, set it to '/'
  //   if (returnPath === '') {
  //     returnPath = '/'
  //   }
  //   // if returnPath is /? then it's search results
  //   // otherwise it's a font category and return everything but the /
  //   returnPath = returnPath.replace(/^\//, '').replace(/\?.*$/, '')
  //   return returnPath.startsWith('/?') ? 'Search results' : `${categoryMap[returnPath]} fonts`
  // })

  const props = defineProps({
    // font: {
    //   type: Object,
    //   required: true
    // },
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

  // const emit = defineEmits(['close', 'tab-change'])

  const onCloseClick = () => {
    // remove font query
    router.replace({
      query: {
        ...route.query,
        font: undefined,
        tab: undefined
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
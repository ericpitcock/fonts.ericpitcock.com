import { createRouter, createWebHistory } from 'vue-router'

import { useFontsStore } from '@/store/fontsStore'

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/FontsSearch.vue'),
  },
  {
    path: '/:category',
    name: 'category',
    component: () => import('@/views/FontsIndex.vue'),
    beforeEnter: (to, from, next) => {
      const fontsStore = useFontsStore()
      const category = to.params.category

      fontsStore.filters.category = category

      // Apply filters from query parameters if they exist
      fontsStore.applyFiltersFromQuery(to.query)

      next()
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const fontsStore = useFontsStore()

  if (!fontsStore.googleFonts.length) {
    await fontsStore.fetchGoogleFonts()
  }

  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    if (fontsStore.theme === 'dark') {
      fontsStore.toggleTheme()
    }
  }

  next()
})

export default router
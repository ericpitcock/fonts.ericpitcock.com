import { createRouter, createWebHistory } from 'vue-router'

import store from '@/store'

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
      const category = to.params.category
      store.commit('setCategoryFilter', category)

      // Apply filters from query parameters if they exist
      store.commit('applyFiltersFromQuery', to.query)

      next()
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => {
  if (!store.state.googleFonts.length) {
    await store.dispatch('fetchGoogleFonts')
  }

  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    if (store.state.theme === 'dark') {
      store.commit('toggleTheme')
    }
  }

  next()
})

export default router
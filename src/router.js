import { createRouter, createWebHistory } from 'vue-router'

import store from '@/store'

import FontsIndex from './views/FontsIndex.vue'
import FontsLanding from './views/FontsLanding.vue'
import FontsSpecimen from './views/FontsSpecimen.vue'

const routes = [
  {
    path: '/',
    name: 'index',
    component: FontsLanding,
  },
  {
    path: '/:category',
    name: 'category',
    component: FontsIndex,
    beforeEnter: (to, from, next) => {
      const category = to.params.category
      store.commit('setCategoryFilter', category)
      next()
    }
  },
  {
    path: '/:category/:font',
    name: 'font',
    component: FontsSpecimen,
    props: (route) => ({
      font: store.getters.getFontBySlug(route.params.font)
    })
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

import { createRouter, createWebHistory } from 'vue-router'

import store from '@/store'

import FontsIndex from './views/FontsIndex.vue'
import FontsSpecimen from './views/FontsSpecimen.vue'

const routes = [
  {
    path: '/',
    name: 'index',
    component: FontsIndex,
  },
  {
    path: '/:font',
    name: 'font',
    component: FontsSpecimen,
    props: route => {
      const slug = route.params.font
      const font = store.state.googleFonts.find(
        font => font.family.toLowerCase().replace(/\s+/g, '-') === slug
      )
      return { font }
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

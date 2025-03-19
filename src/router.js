import { createRouter, createWebHistory } from 'vue-router'

import store from '@/store'

import FontsIndex from './views/FontsIndex.vue'
import FontsSpecimen from './views/FontsSpecimen.vue'

const routes = [
  {
    path: '/',
    name: 'index',
    component: FontsIndex
  },
  {
    path: '/:font',
    name: 'font',
    props: true,
    component: FontsSpecimen,
    // beforeEnter: (to, from, next) => {
    //   // console.log('Specimen loading')
    //   // let family = to.path.replace('-', ' ').toUpperCase()
    //   // let family = to.path.replace('/', ' ').replace('-', ' ').toUpperCase()
    //   // console.log(`Slug: ${family}`)
    //   // console.log(store.getters.getFilteredFonts)
    //   // next()
    //   // let font = store.getters.getFontFromSlug(to.path.replace('/', ''))
    //   // console.log(font)
    //   // store.dispatch('updateCurrentSpecimen', font)

    //   // to.path = /archivo-narrow
    //   const font = to.path.replace('/', '').replace('-', ' ')
    //   // font = archivo narrow

    //   store.dispatch('updateCurrentSpecimen', font)
    //   next()
    // }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => {
  await store.dispatch('fetchGoogleFonts')

  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    if (store.state.theme === 'dark') {
      store.commit('toggleTheme')
    }
  }

  next()
})

export default router

import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import Index from './views/Index.vue'
import Specimen from './views/Specimen.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/:font',
      name: 'font',
      component: Specimen,
      async beforeEnter(to, from, next) {
        await store.dispatch('updateCurrentSpecimen', to.path.replace('/', '').replace('-', ' '))
        next()
      }
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

router.beforeEach(async (to, from, next) => {
  await store.dispatch('fetchGoogleFonts')
  next()
})

export default router
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
      props: true,
      component: Specimen,
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
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  store.dispatch('fetchGoogleFonts')
  // next(vm => Object.assign(vm.$data, data));
  next()
})

// router.beforeEach((to, from, next) => {
//   // store.dispatch('fetchGoogleFonts')
//   // next()
//   async () => {
//     await store.dispatch('fetchGoogleFonts').then(response => {
//       next()
//     }, error => {
//       console.error('Error')
//     })
//   }
// })

export default router

import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Specimen from './views/Specimen.vue'

Vue.use(Router)

export default new Router({
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
      component: Specimen
    }
  ]
})

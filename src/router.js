import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import store from './store'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: App,
      beforeEnter(to, from, next) {
        fetch(
          'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyC4LPtjlhXImnuIBnGbYCgwRLYoXDZ2i8c'
        )
        .then(response => response.json())
        .then(response => store.state.googleFonts = response.items)
        next()
      }
    },
    {
      path: '/:font',
      name: 'font',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './components/Font.vue')
    }
  ]
})

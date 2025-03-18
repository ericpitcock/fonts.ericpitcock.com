// import Vue from 'vue'
// import App from './App.vue'
// import router from './router'
// import store from './store'

// Vue.config.productionTip = false

// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)

import Epicenter from '@ericpitcock/epicenter-vue-components'

app.use(Epicenter)
app.use(store)
app.use(router)
app.mount('#app')

import '@ericpitcock/epicenter-styles/dist/epicenter-design-system.css'
// import app variables and overrides
// import './assets/app.scss'

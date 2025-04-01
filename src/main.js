import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

const pinia = createPinia()
const app = createApp(App)

import Epicenter from '@ericpitcock/epicenter-vue-components'

app.use(Epicenter)
app.use(pinia)
app.use(router)
app.mount('#app')

import '@epicenter-styles/epicenter-design-system.css'
// import app variables and overrides
import './assets/app.scss'

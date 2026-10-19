import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

const pinia = createPinia()
const app = createApp(App)

import Epicenter, { themePlugin } from '@ericpitcock/epicenter-components-vue'

app.use(Epicenter)
app.use(themePlugin)
app.use(pinia)
app.use(router)
app.mount('#app')

import '@ericpitcock/epicenter-styles'
import '@ericpitcock/epicenter-icons-vue/base.scss'
// import app variables and overrides
import './assets/app.scss'

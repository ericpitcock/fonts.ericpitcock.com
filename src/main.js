import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)

import Epicenter from '@ericpitcock/epicenter-vue-components'

app.use(Epicenter)
app.use(router)
app.use(store)
app.mount('#app')

import '@ericpitcock/epicenter-styles/dist/epicenter-design-system.css'

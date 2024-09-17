import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from './router'
import App from './App.vue'
import AuthStorePlugin from './plugins/authStore'
import VueClickAway from 'vue3-click-away'
import axios from 'axios'
import keycloakService from './services/keycloakService'

import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'

import 'bootstrap/dist/css/bootstrap.css'
import bootstrap from 'bootstrap/dist/js/bootstrap'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faArrowRightArrowLeft,
  faDatabase,
  faHouse,
  faStore,
  faClipboardList,
  faChartLine,
  faBell,
  faBars
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

axios.defaults.withCredentials = true

library.add(
  faHouse,
  faDatabase,
  faArrowRightArrowLeft,
  faStore,
  faClipboardList,
  faChartLine,
  faBell,
  faBars
)

// Create Pinia instance
const pinia = createPinia()
// Use persisted state with Pinia so our store data will persist even after page refresh
pinia.use(piniaPluginPersistedstate)

const renderApp = () => {
  const app = createApp(App)
  app.use(AuthStorePlugin, { pinia })
  app.use(pinia)
  app.use(router, bootstrap)
  app.component('v-select', vSelect)
  app.component('font-awesome-icon', FontAwesomeIcon).mount('#app')
}

// renderApp()
keycloakService.CallInit(renderApp)

// const app = createApp(App)

// app.use(VueClickAway)

// app.use(createPinia())
// app.use(router, bootstrap)
// app.component('v-select', vSelect)
// app.component('font-awesome-icon', FontAwesomeIcon).mount('#app')

// app.mount('#app')

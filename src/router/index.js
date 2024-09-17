import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SelectOrCreateHeader from '../views/SelectOrCreateHeader.vue'
import DataEnricher from '../views/dataEnricher/DataEnricher.vue'
// import { initKeycloak, isAuthenticated } from '../services/keycloakService'
import Cookies from 'js-cookie'
import axios from 'axios'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/select-header',
      component: SelectOrCreateHeader
    },
    {
      path: '/convert-data',
      component: DataEnricher
    }
  ]
})

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes
// })

// router.beforeEach(async (to, from, next) => {
//   try {
//     await initKeycloak()
//     // refreshToken()
//     if (isAuthenticated()) {
//       console.log('Authenticated')
//       next()
//     } else {
//       // window.location.href = import.meta.env.VITE_EXTERLNAL_LOGIN_URL
//       console.log('Authenticated')
//       next(false)
//     }
//   } catch (err) {
//     console.error('Failed to initialize Keycloak', err)
//     // window.location.href = import.meta.env.VITE_EXTERLNAL_LOGIN_URL
//     next(false)
//   }
// })

// Route guard global
// router.beforeEach((to, from, next) => {
//   axios({
//     url: import.meta.env.VITE_VERIFICATION,
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     data: new URLSearchParams({
//       grant_type: 'password',
//       client_id: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
//       client_secret: import.meta.env.VITE_KEYCLOAK_CLIENT_SECRET,
//       username: '00-test',
//       password: '00-test'
//     })
//   })
//     .then((res) => {
//       if (res.status === 200) {
//         const token = res.data.access_token
//         console.log('Token', res)
//         next()
//       } else {
//         window.location.href = import.meta.env.VITE_EXTERLNAL_LOGIN_URL
//       }
//     })
//     .catch(() => {
//       window.location.href = import.meta.env.VITE_EXTERLNAL_LOGIN_URL
//     })
// })

// router.beforeEach((to, from, next) => {
//   axios({ url: import.meta.env.VITE_VERIFICATION, method: 'GET' })
//     .then((res) => {
//       if (res.status === 200) {
//         next()
//       } else {
//         window.location.href = import.meta.env.VITE_EXTERLNAL_LOGIN_URL
//       }
//     })
//     .catch(() => {
//       window.location.href = import.meta.env.VITE_EXTERLNAL_LOGIN_URL
//     })
// })

// router.beforeEach((to, from, next) => {
//   const token = Cookies.get('access_token')
//   console.log('Cookie', Cookies)
//   if (token) {
//     // User is authenticated, proceed to the route
//     next()
//   } else {
//     // No token, redirect to the Keycloak login page
//     window.location.href = 'https://pistis-market.eu/'
//   }
// })

export default router

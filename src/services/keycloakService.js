import Keycloak from 'keycloak-js'

const options = {
  url: import.meta.env.VITE_KEYCLOAK_URL,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
  realm: import.meta.env.VITE_KEYCLOAK_REALM
  // secret: import.meta.env.VITE_KEYCLOAK_CLIENT_SECRET
}

const keycloak = new Keycloak(options)
let authenticated
let store = null

/**
 * Initializes Keycloak, then run callback. This will prompt you to login.
 *
 * @param onAuthenticatedCallback
 */
async function init(onInitCallback) {
  try {
    authenticated = await keycloak.init({ onLoad: 'login-required' })
    onInitCallback()
  } catch (error) {
    console.error('Keycloak init failed')
    console.error(error)
  }
}

/**
 * Initializes store with Keycloak user data
 *
 */
async function initStore(storeInstance) {
  try {
    store = storeInstance
    store.initOauth(keycloak)

    // Show alert if user is not authenticated
    if (!authenticated) {
      alert('not authenticated')
    }
  } catch (error) {
    console.error('Keycloak init failed')
    console.error(error)
  }
}

/**
 * Logout user
 */
function logout(url) {
  keycloak.logout({ redirectUri: url })
}

/**
 * Refreshes token
 */
async function refreshToken() {
  try {
    await keycloak.updateToken(480)
    return keycloak
  } catch (error) {
    console.error('Failed to refresh token')
    console.error(error)
  }
}

const KeycloakService = {
  CallInit: init,
  CallInitStore: initStore,
  CallLogout: logout,
  CallTokenRefresh: refreshToken
}

export default KeycloakService

// src/services/keycloak.js
// import Keycloak from 'keycloak-js'

// const keycloak = new Keycloak({
//   url: 'https://auth.pistis-market.eu/auth',
//   realm: 'PISTIS',
//   clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID
//   // clientSecret: 'DYuAlXn8kC1SVzFiYgApfjcodZhdxreL'
//   // onLoad: 'login-required'
// })

// export const initKeycloak = () => {
//   return new Promise((resolve, reject) => {
//     console.log('Initializing keycloak')
//     keycloak
//       .init({
//         onLoad: 'login-required'
//         // checkLoginIframe: false // Disable iframe login check
//       })
//       .then((authenticated) => {
//         console.log('Authenticated:', authenticated)
//         if (authenticated) {
//           resolve(keycloak.token)
//         } else {
//           keycloak.login({ redirectUri: 'http://localhost:8080/' })
//         }
//       })
//       .catch((err) => {
//         console.error('Keycloak initialization error:', err)
//         reject(err)
//       })
//   })
// }

// export const getToken = () => keycloak.token

// export const isAuthenticated = () => keycloak.authenticated

// export const login = () => keycloak.login()

// export const logout = () => keycloak.logout()

// export const refreshToken = async () => {
//   try {
//     const refreshed = await keycloak.updateToken(30) // Refresh token if it's going to expire in 30 seconds
//     if (refreshed) {
//       console.log('Token refreshed')
//     } else {
//       console.log('Token is still valid')
//     }
//   } catch (error) {
//     console.error('Failed to refresh token', error)
//   }
// }

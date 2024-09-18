import { UserManager, WebStorageStateStore } from 'oidc-client-ts'

export const keycloakConfig = {
  url: 'https://auth.pistis-market.eu/',
  realm: 'PISTIS',
  clientId: 'pistis-test-only',
  clientSecret: "DYuAlXn8kC1SVzFiYgApfjcodZhdxreL",
}

const settings = {
  authority: `${keycloakConfig.url}/auth/realms/${keycloakConfig.realm}`,
  client_id: keycloakConfig.clientId,
  client_secret: keycloakConfig.clientSecret,
  redirect_uri: `${window.location.origin}/auth`,
  silent_redirect_uri: `${window.location.origin}/silent-refresh`,
  post_logout_redirect_uri: `${window.location.origin}`,
  response_type: "code",
  userStore: new WebStorageStateStore(),
  loadUserInfo: true,
};
const Auth = new UserManager(settings);


export default Auth

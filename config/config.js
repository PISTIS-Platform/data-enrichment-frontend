const config = {
  api: {
    baseUrl: 'https://develop.pistis-market.eu/srv/data-enrichment-backend',
    baseUrlDataStorage: 'https://develop.pistis-market.eu/srv/factory-data-storage'
  },
  // Data types conversion compatibility
  dataTypeTransformCompatibility: {
    String: new Set(['String', 'Date', 'DateTime']),
    Integer: new Set(['String', 'Integer', 'Double', 'Float']),
    Double: new Set(['String', 'Integer', 'Double']),
    Float: new Set(['String', 'Float']),
    Date: new Set(['String', 'Date', 'DateTime']),
    DateTime: new Set(['String', 'Date', 'DateTime'])
  },
  // Unsupported PISTIS model Data types, will be displayed to the user as some other datatype
  unsupportedDataTypes: new Map([
    ['Bigint', 'Integer'] // ['Double', 'Float'],
  ]),
  publishers: {
    enable: false,
    publishers: [
      // { id: 0 , name : 'publisher1'},
    ]
  },
  dataAnalyticsProjects: {
    enable: false,
    dataAnalyticsProjects: [
      // { id: 0 , name : 'project1'},
    ]
  },
  categories: {
    enable: false,
    categories: [
      { id: 0, name: 'Human Resources' },
      { id: 1, name: 'Production' },
      { id: 2, name: 'Sales' }
    ]
  },
  authentication: {
    keycloak: {
      realm: 'PISTIS',
      //clientId: 'pistis-test-only',
      clientId: 'enrichment-ui-test',
      url: 'https://auth.pistis-market.eu/',
      //clientSecret: 'DYuAlXn8kC1SVzFiYgApfjcodZhdxreL',
      // TODO: Do we need to include these properties? They seem to be default values that never change #2763
      //'ssl-required': 'external',
      //'public-client': true,
      //'verify-token-audience': true,
      //'use-resource-role-mappings': true,
      //'confidential-port': 0
    }
  },
  navigation: [
    { name: 'Home', icon: 'house' },
    { name: 'My Data', icon: 'database' },
    { name: 'My Transactions', icon: 'arrow-right-arrow-left' },
    { name: 'Pistis Market', icon: 'store' },
    { name: 'Manage Services', icon: 'clipboard-list' },
    { name: 'Resources and activities monitor', icon: 'chart-line' }
  ],
  subNav: [
    { name: 'Wallet' },
    { name: 'Data Log' },
    { name: 'Models Manager' },
    { name: 'Purchase/Subscription Plan Designer' },
    { name: 'Data Usage and Intensions Analytics' }
  ]
}

export default config

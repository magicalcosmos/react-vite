const SSO = require('./sso');
module.exports = Object.assign({
  // API address
  API_ENDPOINT: 'http://10.88.223.205/elephant/api/v1/gql/query',
  // Websocket address
  WS_ENDPOINT: 'ws://10.88.223.205/elephant/api/v1/ws',
}, SSO)


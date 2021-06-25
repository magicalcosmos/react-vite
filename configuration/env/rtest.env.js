const {SSO} = require('./sso');
module.exports = Object.assign({
  // API address
  API_ENDPOINT: 'http://10.88.222.104/elephant/api/v1/gql/query',
  // Websocket address
  WS_ENDPOINT: 'ws://10.88.222.104/elephant/api/v1/ws',
}, SSO)


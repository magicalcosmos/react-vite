const SSO = require('./sso');
module.exports = Object.assign({ 
  // API address
  API_ENDPOINT: (W: any) => {
    return `${W.location.protocol}//${W.location.host.split(':')[0]}/elephant/api/v1/gql/query`;
  },
  // Websocket address
  WS_ENDPOINT: (W: any) => {
    return `ws://${W.location.host.split(':')[0]}/elephant/api/v1/ws`;
  }
}, SSO)

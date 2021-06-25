/*eslint-disable*/
const RUN_ENV = require('../configuration/env/rdev.env.js');
module.exports = async () => {
  // ...
  // Set reference to mongod in order to close the server during teardown.
  global.RUN_ENV = RUN_ENV;
};

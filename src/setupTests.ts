/*eslint-disable*/
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
const RUN_ENV = require(`../configuration/env/${process.env.RUN_ENV}.env.js`);
global.RUN_ENV = RUN_ENV;

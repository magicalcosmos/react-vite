//**********************************
//******** Vite base config ********
//**********************************
import { defineConfig } from 'vite';
import path from 'path';
import configStore from '../src/store/config';
let RUN_ENV = {};
if (process.env.RUN_ENV) {
  RUN_ENV = require(`./env/${process.env.RUN_ENV}.env.js`);
}
/**
 * concat path
 * @param dir directory
 */
function resolve(dir) {
  return path.join(__dirname, '..', dir);
}
const configBase = defineConfig({
  define: {
    RUN_ENV: true
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    },
    modules: {
      localsConvention: 'dashes'
    }
  },
  resolve: {
    alias: {
      '~@': resolve('src'),
      '~@gc': resolve('src/components'), // global components
      '~@vc': resolve('src/views/components') // views components
    }
  }
});
export default configBase;

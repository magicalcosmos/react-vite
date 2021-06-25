//**********************************
//***** Vite production config *****
//**********************************
import copy from 'rollup-plugin-copy';
const { merge } = require('webpack-merge');
import configBase from './vite.config.base';
const prodConfig = merge(configBase, {
  mode: 'production',
  plugins: [
    copy({
      targets: [
        {
          src: '../src/pwa/',
          dest: '../dist'
        }
      ]
    })
  ]
});
//TODO: copy file to dist
export default prodConfig;

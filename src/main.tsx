import React from 'react';
import ReactDOM from 'react-dom';
import App from '~@/App';
//TODO: set language in future
//i18n.setDefaultNamespace('zh_CN')
//i18n.setDefaultNamespace('en_US')
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

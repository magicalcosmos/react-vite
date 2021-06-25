
import React from 'react';
import { Provider } from 'mobx-react';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import 'antd/dist/antd.less';
import '~@/theme/index.scss';
import './i18n';
import routes from './routes';
import stores from './store';
function App() {
  return (
    <Provider stores={stores}>
      <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
    </Provider>
  );
}
export default App;

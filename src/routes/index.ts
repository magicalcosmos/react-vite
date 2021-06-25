import loadable from '@loadable/component';
import { RouteConfig } from 'react-router-config';
// import Layout from '~@/layouts';
import Home from '~@/views/Home';
import About from '~@/views/About';
const routesConfig: RouteConfig = [
  {
    path: '/',
    exact: true,
    component: Home,
    routes: [
      {
        path: '/',
        exact: false,
        component: loadable(() => import('~@/views/Home'))
      }
    ]
  },
  {
    path: '/about',
    component: About
  }
];
export default routesConfig;

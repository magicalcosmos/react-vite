import React from 'react';
import { renderRoutes } from 'react-router-config';
const Header = (props: any) => {
  const { route } = props;
  return (<div>this is header { renderRoutes(route.routes)}sdfdf</div>);
};
export default Header;

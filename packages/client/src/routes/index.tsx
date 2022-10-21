import { RouteObject, useRoutes } from 'react-router-dom';

import pages from '@Pages';
import { Page } from '@Types';
import { createElement } from 'react';

const generateRouteObject = (page: Page): RouteObject => ({
  path: page.path,
  element: createElement(page.element),
});

export const AppRoutes = () => {
  const publicPages = pages.filter((page) => !page.protected);

  const auth = { user: 'ss' };

  const routes = auth.user ? pages : publicPages;

  const element = useRoutes(routes.map((route) => generateRouteObject(route)));

  return <>{element}</>;
};

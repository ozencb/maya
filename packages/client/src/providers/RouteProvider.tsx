import { RouteObject, useRoutes } from 'react-router-dom';

import { MainLayout } from '@Layout';
import React from 'react';
import { useMe } from '@Api';
import { RequireAuthority } from '@Layout';
import { AuthorityEnum } from '@Common/types';

const AdminPage = React.lazy(() => import('@Pages/Admin'));
const HomePage = React.lazy(() => import('@Pages/Home'));
const LoginPage = React.lazy(() => import('@Pages/Login'));
const RegisterPage = React.lazy(() => import('@Pages/Register'));
const NoMatch = React.lazy(() => import('@Pages/NoMatch'));

const RouteProvider = () => {
  const { data: loggedInUser } = useMe();

  const publicRoutes: RouteObject[] = [
    { path: '/', element: <HomePage /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/register', element: <RegisterPage /> },
    { path: '*', element: <NoMatch /> },
  ];
  const protectedRoutes: RouteObject[] = [
    {
      path: '/admin',
      element: (
        <RequireAuthority
          requiredAuthorities={[AuthorityEnum['Access Admin Panel']]}
        >
          <AdminPage />
        </RequireAuthority>
      ),
    },
  ];

  const routes = loggedInUser
    ? [...protectedRoutes, ...publicRoutes]
    : publicRoutes;

  const element = useRoutes(routes);

  return <MainLayout>{element}</MainLayout>;
};

export default RouteProvider;

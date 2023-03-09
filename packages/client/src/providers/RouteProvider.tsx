import { RouteObject, useRoutes } from 'react-router-dom';

import { MainLayout } from '@Layout';
import React from 'react';
import { useMe } from '@Api';
import { RequireAuthority } from '@UtilityComponents';

const AdminPage = React.lazy(() => import('@Pages/Admin'));
const HomePage = React.lazy(() => import('@Pages/Home'));
const SignPage = React.lazy(() => import('@Pages/Sign'));
const NoMatch = React.lazy(() => import('@Pages/NoMatch'));
const ProfilePage = React.lazy(() => import('@Pages/Profile'));

const RouteProvider = () => {
  const { data: loggedInUser } = useMe();

  const publicRoutes: RouteObject[] = [
    { path: '/', element: <HomePage /> },
    { path: '/sign', element: <SignPage /> },
    { path: '*', element: <NoMatch /> },
  ];
  const protectedRoutes: RouteObject[] = [
    {
      path: '/admin',
      element: (
        <RequireAuthority requiredAuthority="Access Admin Panel">
          <AdminPage />
        </RequireAuthority>
      ),
    },
    { path: '/profile', element: <ProfilePage /> },
  ];

  const routes = loggedInUser
    ? [...protectedRoutes, ...publicRoutes]
    : publicRoutes;

  const element = useRoutes(routes);

  return <MainLayout>{element}</MainLayout>;
};

export default RouteProvider;

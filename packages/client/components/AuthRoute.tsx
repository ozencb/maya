import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { RootState } from '@Store';
import Loading from './Loading';

type AuthRouteProps = React.PropsWithChildren<{
  children: React.ReactNode;
}>;

const AuthRoute = ({ children }: AuthRouteProps) => {
  const router = useRouter();
  const { authenticated } = useSelector(
    (state: RootState) => state.sessionReducer
  );

  const [authorized, setAuthorized] = useState(false);

  const checkAuth = (url: string) => {
    const publicPaths = ['/login', '/register'];

    const path = url.split('?')[0];

    if (!authenticated && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: '/login',
        query: { returnUrl: router.asPath },
      });
    } else {
      setAuthorized(true);
    }
  };

  useEffect(() => {
    checkAuth(router.asPath);

    const hideContent = () => setAuthorized(false);
    router.events.on('routeChangeStart', hideContent);

    // on route change complete - run auth check
    router.events.on('routeChangeComplete', checkAuth);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', checkAuth);
    };
  }, [router]);

  return authorized ? <>{children}</> : <Loading />;
};

export default AuthRoute;

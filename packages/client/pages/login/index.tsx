import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

import { SignForm, SignContainer } from '@Components';
import { AuthServices } from '@Services';
import jwtManager from '@Helpers/jwt';
import { setAuthenticated } from '@Store/reducers/session';
import { RootState } from '@Store';

const LoginPage: NextPage = () => {
  const { authenticated } = useSelector(
    (state: RootState) => state.sessionReducer
  );
  const router = useRouter();

  if (authenticated) {
    router.push('/');
  }

  const dispatch = useDispatch();
  const onSubmit = async (values: any) => {
    const toastLoadingId = toast.loading('Logging in');

    const { username, password } = values;
    const res = await AuthServices.logIn({ username, password });
    if (res) {
      jwtManager.setToken(res.accessToken);
      dispatch(setAuthenticated(true));
      toast.dismiss(toastLoadingId);
      toast.success('Logging in', { duration: 1 });
    }
  };

  return (
    <div>
      <Head>
        <title>Login | Maya</title>
      </Head>
      <SignContainer mode="login">
        <SignForm onSubmit={onSubmit} />
      </SignContainer>
    </div>
  );
};

export default LoginPage;

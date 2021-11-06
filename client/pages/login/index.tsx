import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

import SignIn from '../../components/SignForm';
import { AuthServices } from '../../services';
import SignContainer from '../../components/SignContainer';
import jwtManager from '../../helpers/jwt';
import { setAuthenticated } from '../../store/reducers/session';
import { RootState } from '../../store';

const LoginPage: NextPage = () => {
  const { authenticated } = useSelector(
    (state: RootState) => state.sessionReducer
  );
  const router = useRouter();

  if (authenticated) router.push('/');

  const dispatch = useDispatch();
  const onSubmit = async (values: any) => {
    const toastLoadingId = toast.loading('Logging in');

    const { username, password } = values;
    const res = await AuthServices.logIn({ username, password });
    jwtManager.setToken(res.accessToken);

    dispatch(setAuthenticated(true));

    toast.dismiss(toastLoadingId);
    toast.success('Logging in', { duration: 1 });
    router.push('/');
  };

  return (
    <div>
      <Head>
        <title>Login | Maya BoilerPlate</title>
      </Head>
      <SignContainer mode="login">
        <SignIn onSubmit={onSubmit} />
      </SignContainer>
    </div>
  );
};

export default LoginPage;

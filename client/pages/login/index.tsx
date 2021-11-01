import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

import SignIn from '../../components/SignForm';
import { AuthServices } from '../../services';
import SignContainer from '../../components/SignContainer';
import LinkButton from '../../components/LinkButton';
import jwtManager from '../../helpers/jwt';
import { setUser } from '../../store/reducers/session';
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

    dispatch(setUser({ username }));

    toast.dismiss(toastLoadingId);
    toast.success('Logging in', { duration: 1 });
    router.push('/');
  };

  return (
    <SignContainer title="Sign In">
      <SignIn onSubmit={onSubmit} />
      <LinkButton href="/register" title="Don't have an account?" />
    </SignContainer>
  );
};

export default LoginPage;

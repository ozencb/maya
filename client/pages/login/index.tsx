import React from 'react';
import { NextPage } from 'next';

import SignIn from '../../components/SignForm';
import { AuthServices } from '../../services';
import SignContainer from '../../components/SignContainer';
import LinkButton from '../../components/LinkButton';
import jwtManager from '../../helpers/jwt';
import toast from 'react-hot-toast';

const LoginPage: NextPage = () => {
  const onSubmit = async (values: any) => {
    const toastLoadingId = toast.loading('Logging in');

    const { username, password } = values;
    const res = await AuthServices.logIn({ username, password });
    jwtManager.setToken(res.accessToken);

    toast.dismiss(toastLoadingId);
    toast.success('Logging in');
  };

  return (
    <SignContainer title="Sign In">
      <SignIn onSubmit={onSubmit} />
      <LinkButton href="/register" title="Don't have an account?" />
    </SignContainer>
  );
};

export default LoginPage;

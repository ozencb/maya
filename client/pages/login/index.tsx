import React from 'react';
import { NextPage } from 'next';

import SignIn from '../../components/SignForm';
import { AuthServices } from '../../services';
import SignContainer from '../../components/SignContainer';
import LinkButton from '../../components/LinkButton';

const LoginPage: NextPage = () => {
  const onSubmit = async (values: any) => {
    const { username, password } = values;
    await AuthServices.logIn({ username, password });
  };

  return (
    <SignContainer title="Sign In">
      <SignIn onSubmit={onSubmit} />
      <LinkButton href="/register" title="Don't have an account?" />
    </SignContainer>
  );
};

export default LoginPage;

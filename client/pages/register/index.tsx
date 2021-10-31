import React from 'react';
import { NextPage } from 'next';

import SignUp from '../../components/SignForm';
import { AuthServices } from '../../services';
import SignContainer from '../../components/SignContainer';
import LinkButton from '../../components/LinkButton';

const RegisterPage: NextPage = () => {
  const onSubmit = async (values: any) => {
    const { username, password } = values;
    await AuthServices.register({ username, password });
  };

  return (
    <SignContainer title="Register">
      <SignUp onSubmit={onSubmit} />
      <LinkButton href="/login" title="Already registered?" />
    </SignContainer>
  );
};

export default RegisterPage;

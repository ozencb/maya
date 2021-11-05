import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import SignUp from '../../components/SignForm';
import { AuthServices } from '../../services';
import SignContainer from '../../components/SignContainer';
import { RootState } from '../../store';

const RegisterPage: NextPage = () => {
  const { authenticated } = useSelector(
    (state: RootState) => state.sessionReducer
  );
  const router = useRouter();

  if (authenticated) router.push('/');

  const onSubmit = async (values: any) => {
    const { username, password } = values;
    await AuthServices.register({ username, password });
  };

  return (
    <SignContainer mode="register">
      <SignUp onSubmit={onSubmit} />
    </SignContainer>
  );
};

export default RegisterPage;

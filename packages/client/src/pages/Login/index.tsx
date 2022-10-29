import { useLocation, useNavigate } from 'react-router-dom';

import { SignContainer, SignForm } from '@Form';
import { useLogin, useMe } from '@Api';
import { useEffect } from 'react';
import { Head } from '@UtilityComponents';

const LoginPage: React.FC = () => {
  let navigate = useNavigate();
  let location = useLocation();

  const mutation = useLogin();
  const { data } = useMe();

  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (data?.username) {
      navigate(from, { replace: true });
    }
  }, [data]);

  return (
    <>
      <Head title="Login" />
      <SignContainer mode="login">
        <SignForm
          onSubmit={(e) => {
            mutation.mutate(e);
          }}
        />
      </SignContainer>
    </>
  );
};

export default LoginPage;

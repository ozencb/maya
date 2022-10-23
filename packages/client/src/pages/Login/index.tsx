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

  let from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (data?.username) {
      navigate(from, { replace: true });
    }
  }, [data]);

  return (
    <>
      <Head title="Login" />
      <p>You must log in to view the page at {from}</p>
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

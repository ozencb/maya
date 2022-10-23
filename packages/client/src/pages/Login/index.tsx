import { useLocation, useNavigate } from 'react-router-dom';

import { SignContainer, SignForm } from '@Form';
import { useLogin, useMe } from '@Api';
import { useEffect } from 'react';

const LoginPage: React.FC = () => {
  let navigate = useNavigate();
  let location = useLocation();

  const mutation = useLogin();
  const { data, refetch } = useMe();

  let from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (data?.username) {
      navigate(from, { replace: true });
    }
  }, [data]);

  return (
    <>
      <p>You must log in to view the page at {from}</p>
      <SignContainer mode="login">
        <SignForm
          onSubmit={(e) => {
            mutation.mutate(e);
            refetch();
          }}
        />
      </SignContainer>
    </>
  );
};

export default LoginPage;

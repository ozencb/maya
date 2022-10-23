import { useMe, useRegister } from '@Api';
import { SignContainer, SignForm } from '@Form';
import { Head } from '@UtilityComponents';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  let navigate = useNavigate();
  const mutation = useRegister();

  useEffect(() => {
    if (mutation.isSuccess) {
      navigate('/login', { replace: true });
    }
  }, [mutation.isSuccess]);

  return (
    <>
      <Head title="Register" />
      <SignContainer mode="register">
        <SignForm
          onSubmit={(e) => {
            mutation.mutate(e);
          }}
        />
      </SignContainer>
    </>
  );
};

export default RegisterPage;

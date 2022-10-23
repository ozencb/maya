import { useMe, useRegister } from '@Api';
import { SignContainer, SignForm } from '@Form';
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
    <SignContainer mode="register">
      <SignForm
        onSubmit={(e) => {
          mutation.mutate(e);
          console.log(mutation);
        }}
      />
    </SignContainer>
  );
};

export default RegisterPage;

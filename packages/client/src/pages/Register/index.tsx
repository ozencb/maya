import { useRegister } from '@Api';
import { SignContainer, SignForm } from '@Form';

const RegisterPage: React.FC = () => {
  const mutation = useRegister();
  return (
    <SignContainer mode="login">
      <SignForm onSubmit={(e) => mutation.mutate(e)} />
    </SignContainer>
  );
};

export default RegisterPage;

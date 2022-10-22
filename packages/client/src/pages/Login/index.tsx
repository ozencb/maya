import { SignContainer, SignForm } from '@Form';
import { SignFormFields } from '@Types';
import { useLogin } from '@Api';

const LoginPage: React.FC = () => {
  const mutation = useLogin();
  return (
    <SignContainer mode="login">
      <SignForm onSubmit={(e) => mutation.mutate(e)} />
    </SignContainer>
  );
};

export default LoginPage;

import { SignContainer, SignForm } from '@Form';

const LoginPage: React.FC = () => {
  const onSubmit = (e: any) => {
    console.log(e);
  };

  return (
    <SignContainer mode="login">
      <SignForm onSubmit={onSubmit} />
    </SignContainer>
  );
};

export default LoginPage;

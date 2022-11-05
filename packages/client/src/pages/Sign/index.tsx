import { useLocation, useNavigate } from 'react-router-dom';

import { SignForm } from '@Form';
import { useLogin, useMe, useRegister } from '@Api';
import { useEffect, useState } from 'react';
import { Head } from '@UtilityComponents';
import { Button } from '@Elements';

import styles from './styles.module.scss';

type Mode = 'login' | 'register';

const SignPage = () => {
  const [mode, setMode] = useState<Mode>('register');

  let navigate = useNavigate();
  let location = useLocation();

  const login = useLogin();
  const register = useRegister();

  const { data } = useMe();

  const modes = {
    login: {
      title: 'Log In',
      question: "Don't have an account?",
      method: login,
    },
    register: {
      title: 'Sign Up',
      question: 'Already have an account?',
      method: register,
    },
  };

  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (data?.username) {
      navigate(from, { replace: true });
    }
  }, [data]);

  return (
    <>
      <Head title="Sign" />
      <div className={styles.container}>
        <div className={styles.form}>
          <h1 className={styles.header}>{modes[mode].title}</h1>
          <SignForm
            onSubmit={(e) => {
              modes[mode].method.mutate(e);
            }}
          />
        </div>
        <Button
          type="text"
          onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
          size="small"
        >
          {modes[mode].question}
        </Button>
      </div>
    </>
  );
};

export default SignPage;

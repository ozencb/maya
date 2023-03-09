import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import { SignForm } from '@Form';
import { useEffect, useState } from 'react';
import { Head } from '@UtilityComponents';
import { Button } from '@Elements';
import { trpc } from '@Lib';

import styles from './styles.module.scss';

type Mode = 'login' | 'register';

const SignPage = () => {
  const [mode, setMode] = useState<Mode>('register');

  let navigate = useNavigate();
  let location = useLocation();

  const { data } = trpc.user.me.useQuery();

  const modes = {
    login: {
      title: 'Log In',
      question: "Don't have an account?",
      method: trpc.auth.login,
    },
    register: {
      title: 'Sign Up',
      question: 'Already have an account?',
      method: trpc.auth.register,
    },
  };

  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (data?.data.username) {
      navigate(from, { replace: true });
    }
  }, [data]);

  return (
    <>
      <Head title="Sign" />
      <div className={classNames(styles.container, 'no-select')}>
        <div className={styles.form}>
          <h1 className={styles.header}>{modes[mode].title}</h1>
          <SignForm
            onSubmit={(e) => {
              modes[mode].method.useMutation(e.username, e.password);
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

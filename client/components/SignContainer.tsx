import React from 'react';
import Link from 'next/link';

import styles from '../styles/SignContainer.module.scss';

interface SignContainerProps {
  children: React.ReactNode;
  mode: 'login' | 'register';
}

const SignContainer: React.FC<SignContainerProps> = ({ children, mode }) => {
  const modes = {
    login: {
      title: 'Log In',
      redirect: '/register',
      question: "Don't have an account?",
    },
    register: {
      title: 'Sign Up',
      redirect: '/login',
      question: 'Already have an account?',
    },
  };

  return (
    <div className={styles.container}>
      <div className={styles.redirectLink}>
        <Link href={modes[mode].redirect}>{modes[mode].question}</Link>
      </div>

      <div className={styles.formContainer}>
        {<h1 className={styles.title}>{modes[mode].title}</h1>}
        {children}
      </div>
    </div>
  );
};

export default SignContainer;

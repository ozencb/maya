import React from 'react';
import { Link } from 'react-router-dom';

type SignContainerProps = {
  children: React.ReactNode;
  mode: 'login' | 'register';
};

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
    <div>
      <div>
        <Link to={modes[mode].redirect}>{modes[mode].question}</Link>
      </div>

      <div>
        {<h1>{modes[mode].title}</h1>}
        {children}
      </div>
    </div>
  );
};

export default SignContainer;

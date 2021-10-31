import React from 'react';

import styles from '../styles/SignContainer.module.scss';

interface SignContainerProps {
  children: React.ReactNode;
  title?: string;
}

const SignContainer: React.FC<SignContainerProps> = ({ children, title }) => {
  return (
    <div className={styles.container}>
      <div className={styles.sign}>
        {title && <h1 className={styles.title}>{title}</h1>}
        {children}
      </div>
    </div>
  );
};

export default SignContainer;

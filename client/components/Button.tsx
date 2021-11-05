import React from 'react';

import styles from '../styles/Button.module.scss';

interface ButtonProps {
  children: React.ReactNode;
  onClick?(): void;
  filled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  filled = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={filled ? styles.filled : styles.outline}
    >
      {children}
    </button>
  );
};

export default Button;

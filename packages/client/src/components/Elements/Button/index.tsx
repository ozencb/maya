import React from 'react';

import { spreadClasses } from '@Utils';

import styles from './styles.module.scss';

type ButtonProps = {
  children: React.ReactNode;
  onClick?(): void;
  filled?: boolean;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  filled = false,
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={spreadClasses(
        filled ? styles.filled : styles.outline,
        disabled && styles.disabled
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;

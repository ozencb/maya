import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?(): void;
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className={'font-bold py-2 px-4 rounded'}>
      {children}
    </button>
  );
};

export default Button;

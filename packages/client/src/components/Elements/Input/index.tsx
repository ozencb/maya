import { UseFormRegister } from 'react-hook-form';

import styles from './styles.module.scss';

type InputProps = {
  name: string;
  label?: string;
  register: UseFormRegister<any>;
  type?: string;
  required?: boolean;
  placeholder?: string;
};

const Input: React.FC<InputProps> = ({
  name,
  label,
  register,
  required,
  type,
  placeholder,
}) => (
  <div className={styles.input}>
    {label && (
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
    )}
    <input
      className={styles.field}
      {...register(name, { required })}
      type={type}
      placeholder={placeholder}
    />
  </div>
);

export default Input;

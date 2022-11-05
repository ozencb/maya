import * as LabelPrimitive from '@radix-ui/react-label';
import { UseFormRegister } from 'react-hook-form';
import classNames from 'classnames';

import styles from './styles.module.scss';

type Props = {
  name: string;
  label?: string;
  register: UseFormRegister<any>;
  type?: string;
  required?: boolean;
  placeholder?: string;
  orientation?: 'vertical' | 'horizontal';
};

const FormInput = ({
  name,
  label,
  register,
  required,
  type,
  placeholder,
  orientation = 'vertical',
}: Props): JSX.Element => (
  <div className={classNames(styles.container, styles[orientation])}>
    {label && (
      <LabelPrimitive.Root htmlFor={name} className={styles.label}>
        {label}
      </LabelPrimitive.Root>
    )}

    <input
      id={name}
      {...register(name, { required })}
      type={type}
      placeholder={placeholder}
      className={styles.input}
    />
  </div>
);

export default FormInput;

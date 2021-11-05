import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import InputField from './Input';
import Button from './Button';

import styles from '../styles/SignForm.module.scss';

const schema = yup.object().shape({
  username: yup
    .string()
    .min(4, 'Username must contain at least 4 characters')
    .required('Username is required!'),
  password: yup
    .string()
    .min(8, 'Password must contain at least 8 characters')
    .required('Password is required!'),
});

interface ISignForm {
  username: string;
  password: string;
}

type SignFormProps = {
  onSubmit(data: ISignForm): void;
};

const SignForm: React.FC<SignFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm<ISignForm>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const submitForm = (data: ISignForm) => {
    onSubmit(data);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <InputField
          register={register}
          name="username"
          placeholder="Username"
        />
        <InputField
          register={register}
          name="password"
          placeholder="password"
          type="password"
          label="test"
        />
      </form>
      <Button onClick={handleSubmit(submitForm)} filled>
        Submit
      </Button>
    </div>
  );
};

export default SignForm;

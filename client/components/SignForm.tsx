import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputField from './Input';

import styles from '../styles/SignForm.module.scss';
import Button from './Button';

const schema = yup.object().shape({
  username: yup.string().required('Username is required!'),
  password: yup
    .string()
    .min(4, 'Password must contain at least 4 characters')
    .required('Password is required!'),
});

interface ISignForm {
  username: string;
  password: string;
}

interface SignFormProps {
  onSubmit(data: ISignForm): void;
}

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

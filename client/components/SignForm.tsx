import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import InputField from './Input';
import Button from './Button';

import styles from '../styles/SignForm.module.scss';

const schema = z.object({
  username: z.string().min(4, 'Username must contain at least 4 characters'),
  password: z.string().min(4, 'Password must contain at least 4 characters'),
});

interface ISignForm {
  username: string;
  password: string;
}

type SignFormProps = {
  onSubmit(data: ISignForm): void;
};

const SignForm: React.FC<SignFormProps> = ({ onSubmit }) => {
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit } = useForm<ISignForm>({
    resolver: zodResolver(schema),
  });

  const submitForm = async (data: ISignForm) => {
    console.log(data);
    setSubmitting(true);
    onSubmit(data);
    setSubmitting(false);
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
          placeholder="Password"
          type="password"
        />
      </form>
      <Button
        onClick={() => {
          handleSubmit(submitForm)();
        }}
        disabled={submitting}
        filled
      >
        Submit
      </Button>
    </div>
  );
};

export default SignForm;

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input, Button } from '@Elements';
import { signSchema } from '@Common/schemas';

import styles from './styles.module.scss';

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
    resolver: zodResolver(signSchema),
  });

  const submitForm = async (data: ISignForm) => {
    setSubmitting(true);
    onSubmit(data);
    setSubmitting(false);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <Input register={register} name="username" placeholder="Username" />
        <Input
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

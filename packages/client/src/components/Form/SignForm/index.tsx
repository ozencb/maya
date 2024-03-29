import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@Elements';
import { signSchema } from '@Schemas';
import { FormInput } from '..';

import styles from './styles.module.scss';

type SignForm = z.TypeOf<typeof signSchema>;

type Props = {
  onSubmit(data: SignForm): void;
};

const SignForm = ({ onSubmit }: Props): JSX.Element => {
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit } = useForm<SignForm>({
    resolver: zodResolver(signSchema),
  });

  const submitForm = async (data: SignForm) => {
    setSubmitting(true);
    onSubmit(data);
    setSubmitting(false);
  };

  return (
    <div className={styles.container}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(submitForm)();
        }}
        className={styles.form}
      >
        <FormInput register={register} name="username" label="Username" />
        <FormInput
          register={register}
          name="password"
          type="password"
          label="Password"
        />
        <input type="submit" hidden />
      </form>
      <Button
        onClick={() => {
          handleSubmit(submitForm)();
        }}
        disabled={submitting}
      >
        Submit
      </Button>
    </div>
  );
};

export default SignForm;

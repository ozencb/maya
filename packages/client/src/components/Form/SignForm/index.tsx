import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@Elements';
import { signSchema } from '@Common/schemas';
import { FormInput } from '..';

import styles from './styles.module.scss';

interface ISignForm {
  username: string;
  password: string;
}

type Props = {
  onSubmit(data: ISignForm): void;
};

const SignForm = ({ onSubmit }: Props): JSX.Element => {
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

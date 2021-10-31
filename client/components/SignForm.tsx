import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputField from './Input';

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
    <form onSubmit={handleSubmit(submitForm)}>
      <InputField register={register} name="username" placeholder="Username" />
      <InputField
        register={register}
        name="password"
        placeholder="password"
        type="password"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default SignForm;

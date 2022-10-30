import { UseFormRegister } from 'react-hook-form';

type Props = {
  name: string;
  label?: string;
  register: UseFormRegister<any>;
  type?: string;
  required?: boolean;
  placeholder?: string;
};

const Input = ({
  name,
  label,
  register,
  required,
  type,
  placeholder,
}: Props): JSX.Element => (
  <div>
    {label && <label htmlFor={name}>{label}</label>}
    <input
      {...register(name, { required })}
      type={type}
      placeholder={placeholder}
    />
  </div>
);

export default Input;

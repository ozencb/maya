import { UseFormRegister } from 'react-hook-form';

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

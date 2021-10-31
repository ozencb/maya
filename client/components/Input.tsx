import { UseFormRegister } from 'react-hook-form';

interface InputFieldProps {
  name: string;
  label?: string;
  register: UseFormRegister<any>;
  type?: string;
  required?: boolean;
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  register,
  required,
  type,
  placeholder,
}) => (
  <div className="text-left pt-3">
    {label && <label>{label}</label>}
    <input
      {...register(name, { required })}
      type={type}
      placeholder={placeholder}
    />
  </div>
);

export default InputField;

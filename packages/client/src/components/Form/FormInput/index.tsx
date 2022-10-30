import * as LabelPrimitive from '@radix-ui/react-label';
import { UseFormRegister } from 'react-hook-form';
import classnames from 'classnames';

type Props = {
  name: string;
  label?: string;
  register: UseFormRegister<any>;
  type?: string;
  required?: boolean;
  placeholder?: string;
  orientation?: 'vertical' | 'horizontal';
};

const FormInput = ({
  name,
  label,
  register,
  required,
  type,
  placeholder,
  orientation = 'vertical',
}: Props): JSX.Element => (
  <div
    className={classnames(
      'flex gap-2 ',
      orientation === 'vertical'
        ? 'flex-row items-center'
        : 'flex-col justify-center'
    )}
  >
    {label && (
      <LabelPrimitive.Root
        htmlFor={name}
        className="text-md font-medium text-white select-none"
      >
        {label}
      </LabelPrimitive.Root>
    )}

    <input
      id={name}
      {...register(name, { required })}
      type={type}
      placeholder={placeholder}
      className="w-60 inline-flex items-center justify-center rounded-sm px-2 h-8 text-sm leading-4 text-black focus:outline-none focus-within:ring-2 focus-within:ring-violet-400"
    />
  </div>
);

export default FormInput;

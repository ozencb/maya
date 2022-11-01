import { ElementBaseProps, ElementSize, ElementSizeMap } from '@Types';
import classnames from 'classnames';

type Props = ElementBaseProps<HTMLButtonElement> & {
  children: string;
  onClick?(): void;
  disabled?: boolean;
  type?: 'primary' | 'secondary' | 'danger' | 'text';
  size?: ElementSize;
};

const Button = ({
  children,
  style,
  className,
  onClick,
  disabled = false,
  type = 'primary',
  size = 'normal',
}: Props): JSX.Element => {
  const classes = {
    base: 'w-full focus:outline-none focus:ring-2 transition ease-in-out duration-300',
    size: {
      small: 'px-2 py-1 text-sm',
      normal: 'px-4 py-2',
      large: 'px-8 py-3 text-lg',
    } as ElementSizeMap,
    type: {
      primary:
        'bg-violet-400 hover:bg-violet-700 focus:ring-violet-800 focus:ring-opacity-50 text-white',
      secondary:
        'bg-gray-200 hover:bg-gray-800 focus:ring-gray-500 focus:ring-opacity-50 text-gray-900 hover:text-white',
      danger:
        'bg-red-500 hover:bg-red-800 focus:ring-red-500 focus:ring-opacity-50 text-white',
      text: 'text-white focus:ring-violet-400',
    },
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={classnames(
        classes.base,
        classes.size[size],
        classes.type[type],
        className?.toString()
      )}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;

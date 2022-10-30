import classnames from 'classnames';

type Props = {
  children: string;
  onClick?(): void;
  filled?: boolean;
  disabled?: boolean;
  type?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'normal' | 'large';
};

const Button = ({
  children,
  onClick,
  disabled = false,
  type = 'primary',
  size = 'normal',
}: Props): JSX.Element => {
  const classes = {
    base: 'focus:outline-none transition ease-in-out duration-300',
    size: {
      small: 'px-2 py-1 text-sm',
      normal: 'px-4 py-2',
      large: 'px-8 py-3 text-lg',
    },
    type: {
      primary:
        'bg-blue-500 hover:bg-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-white',
      secondary:
        'bg-gray-200 hover:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 text-gray-900 hover:text-white',
      danger:
        'bg-red-500 hover:bg-red-800 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 text-white',
    },
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={classnames(
        classes.base,
        classes.size[size],
        classes.type[type]
      )}
    >
      {children}
    </button>
  );
};

export default Button;

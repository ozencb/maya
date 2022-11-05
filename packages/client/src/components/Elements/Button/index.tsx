import { ElementBaseProps, ElementSize, ElementSizeMap } from '@Types';
import classnames from 'classnames';

import styles from './styles.module.scss';

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
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={classnames(
        styles.base,
        styles[type],
        styles[size],
        className?.toString()
      )}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;

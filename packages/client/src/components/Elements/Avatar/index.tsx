import * as AvatarPrimitive from '@radix-ui/react-avatar';
import classnames from 'classnames';
import { ElementSize, ElementSizeMap } from '@Types';

import styles from './styles.module.scss';

type Props = {
  src?: string;
  alt: string;
  fallback: string;
  size?: ElementSize;
};

const Avatar = ({ src, alt, fallback, size = 'normal' }: Props) => {
  return (
    <AvatarPrimitive.Root
      className={classnames(styles.container, styles[size])}
    >
      <AvatarPrimitive.Image src={src} alt={alt} className={styles.image} />
      <AvatarPrimitive.Fallback className={styles.fallback}>
        {`${fallback[0]}${fallback[1]}`.toLocaleUpperCase()}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
};

export default Avatar;

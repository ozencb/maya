import * as AvatarPrimitive from '@radix-ui/react-avatar';
import classnames from 'classnames';
import { ElementSize, ElementSizeMap } from '@Types';

type Props = {
  src?: string;
  alt: string;
  fallback: string;
  size?: ElementSize;
};

const Avatar = ({ src, alt, fallback, size = 'normal' }: Props) => {
  const sizes: ElementSizeMap = {
    small: 'w-8 h-8',
    normal: 'w-12 h-12',
    large: 'w-16 h-16',
  };
  return (
    <AvatarPrimitive.Root
      className={classnames(
        'inline-flex items-center justify-center align-middle overflow-hidden select-none rounded-full',
        sizes[size]
      )}
    >
      <AvatarPrimitive.Image
        src={src}
        alt={alt}
        className="w-full h-full object-cover rounded-full"
      />
      <AvatarPrimitive.Fallback className="flex w-full h-full items-center justify-center bg-zinc-400 via-violet-400 text-sm leading-4 font-medium">
        {`${fallback[0]}${fallback[1]}`.toLocaleUpperCase()}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
};

export default Avatar;

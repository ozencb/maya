import * as AvatarPrimitive from '@radix-ui/react-avatar';

type Props = {
  src?: string;
  alt: string;
  fallback: string;
};

const Avatar = ({ src, alt, fallback }: Props) => (
  <AvatarPrimitive.Root className="inline-flex items-center justify-center align-middle overflow-hidden select-none w-12 h-12 rounded-full">
    <AvatarPrimitive.Image
      src={src}
      alt={alt}
      className="w-full h-full object-cover rounded-full"
    />
    <AvatarPrimitive.Fallback className="flex w-full h-full items-center justify-center bg-white via-violet-400 text-sm leading-4 font-medium">
      {fallback}
    </AvatarPrimitive.Fallback>
  </AvatarPrimitive.Root>
);

export default Avatar;

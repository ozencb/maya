export type SignFormFields = {
  username: string;
  password: string;
};

export type ElementSize = 'small' | 'normal' | 'large';
export type ElementSizeMap = { [size in ElementSize]: string };
export type ElementBaseProps<T> = {
  style?: React.CSSProperties;
  className?: React.HTMLAttributes<T> | string;
};

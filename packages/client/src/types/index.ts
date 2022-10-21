export type Page = {
  title: string;
  path: string;
  element: React.FC | React.ComponentType<any>;
  protected: boolean;
  requiredAuthority?: string;
};

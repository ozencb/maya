export type Page = {
  title: string;
  path: string;
  element: React.FC;
  protected: boolean;
  requiredAuthority?: string;
};

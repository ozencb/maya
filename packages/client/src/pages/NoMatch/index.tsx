import { Page } from '@Types';

const NoMatch: React.FC = () => {
  return <div>NoMatch</div>;
};

export default {
  title: 'NoMatch',
  path: '*',
  element: NoMatch,
  protected: false,
} as Page;

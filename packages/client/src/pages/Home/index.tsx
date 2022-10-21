import { Page } from '@Types';

const Home: React.FC = () => {
  return <div>Home</div>;
};

export default {
  title: 'Home',
  path: '/home',
  element: Home,
  protected: false,
} as Page;

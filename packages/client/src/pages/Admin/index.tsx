import { Page } from '@Types';

const AdminPage: React.FC = () => {
  return <div>AdminPage</div>;
};

export default {
  title: 'AdminPage',
  path: '/admin',
  element: AdminPage,
  protected: true,
  requiredAuthority: 'CAN_ACCESS_ADMIN_PAGE',
} as Page;

import NavBar from '../NavBar';
import { ReactNode } from 'react';
import { Head } from '@UtilityComponents';

type Props = {
  children: ReactNode;
};

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <Head />
      <NavBar />
      <div>{children}</div>
    </div>
  );
};

export default MainLayout;

import NavBar from '../NavBar';
import { ReactNode } from 'react';
import { Head } from '@UtilityComponents';

type Props = {
  children: ReactNode;
};

const MainLayout = ({ children }: Props): JSX.Element => {
  return (
    <div className="flex flex-col h-screen">
      <Head />
      <NavBar />
      <div className="flex flex-col flex-1 p-4">{children}</div>
    </div>
  );
};

export default MainLayout;

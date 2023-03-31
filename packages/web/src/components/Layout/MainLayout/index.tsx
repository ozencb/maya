import NavBar from '../NavBar';
import { ReactNode } from 'react';
import { Head } from '@UtilityComponents';

import styles from './styles.module.scss';

type Props = {
  children: ReactNode;
};

const MainLayout = ({ children }: Props): JSX.Element => {
  return (
    <div className={styles.container}>
      <Head />
      <NavBar />
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default MainLayout;

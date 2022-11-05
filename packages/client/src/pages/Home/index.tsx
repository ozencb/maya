import { Head } from '@UtilityComponents';

import styles from './styles.module.scss';

const HomePage = (): JSX.Element => {
  return (
    <>
      <Head title="Home" />
      <div className={styles.header}>Home</div>
    </>
  );
};

export default HomePage;

import { Head } from '@UtilityComponents';

import styles from './styles.module.scss';

const HomePage = (): JSX.Element => {
  return (
    <>
      <Head title="Home" />
      <div className={styles.container}>
        <div className={styles.header}>Home</div>
      </div>
    </>
  );
};

export default HomePage;

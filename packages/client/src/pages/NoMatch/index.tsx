import { Head } from '@UtilityComponents';

import styles from './styles.module.scss';

const NoMatchPage = (): JSX.Element => {
  return (
    <>
      <Head title="404" />
      <div className={styles.container}>404</div>
    </>
  );
};

export default NoMatchPage;

import { Head } from '@UtilityComponents';

import styles from './styles.module.scss';

const ProfilePage = (): JSX.Element => {
  return (
    <>
      <Head title="Profile" />
      <div className={styles.header}>Profile Page</div>
    </>
  );
};

export default ProfilePage;

import Link from 'next/link';

import LogOutButton from './LogOutButton';

import styles from '@Styles/NavBar.module.scss';

export const NavBar = () => {
  const navigation = [
    { name: 'Dashboard', href: '/', current: true },
    { name: 'Protected Page', href: '/protected', current: false },
    { name: '404', href: '/four-oh-four', current: false },
  ];

  return (
    <nav className={styles.navbarContainer}>
      <div className={styles.navbar}>
        <div className={styles.navbarLayout}>
          <div className={styles.menuItems}>
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                {item.name}
              </Link>
            ))}
          </div>
          <div className={styles.optionsPane}>
            <LogOutButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

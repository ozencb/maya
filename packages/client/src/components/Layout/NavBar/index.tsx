import { useLogout } from '@Api';
import { Button } from '@Elements';
import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

const NavBar: React.FC = () => {
  const logout = useLogout();

  const links = [
    {
      path: '/',
      name: 'Home',
    },
    {
      path: '/admin',
      name: 'Admin',
    },
    {
      path: '/register',
      name: 'Register',
    },
    {
      path: '/login',
      name: 'Login',
    },
  ];

  const test = () => {
    console.log('aa');
  };

  const funcs = [
    {
      name: 'Logout',
      method: logout.mutate,
    },
  ];

  return (
    <nav className={styles.container}>
      <ul>
        {links.map((link) => (
          <li key={link.path}>
            <Link to={link.path}>{link.name}</Link>
          </li>
        ))}
      </ul>
      <ul>
        {funcs.map((func) => (
          <li key={func.name}>
            <Button onClick={func.method}>{func.name}</Button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;

import { useLogout, useMe } from '@Api';
import { Button } from '@Elements';
import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

const NavBar: React.FC = () => {
  const logout = useLogout();
  const { data: loggedInUser } = useMe();

  return (
    <nav className={styles.container}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
      <ul>
        {loggedInUser && loggedInUser.username ? (
          <Button onClick={logout.mutate}>Logout</Button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;

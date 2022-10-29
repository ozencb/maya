import React from 'react';
import { Link } from 'react-router-dom';

import { useHasAuthority, useLogout, useMe } from '@Api';
import { AuthorityEnum } from '@Common/types';
import { Button } from '@Elements';

const NavBar: React.FC = () => {
  const logout = useLogout();
  const { data: loggedInUser } = useMe();
  const { data: hasAuthority } = useHasAuthority(
    AuthorityEnum['Access Admin Panel']
  );

  return (
    <nav className="flex flex-row justify-between p-2">
      <ul className="flex flex-row gap-2">
        <li>
          <Link to="/">Home</Link>
        </li>
        {hasAuthority && (
          <li>
            <Link to="/admin">Admin</Link>
          </li>
        )}
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

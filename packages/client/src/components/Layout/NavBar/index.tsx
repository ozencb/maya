import React from 'react';
import { Link } from 'react-router-dom';

import { useHasAuthority, useLogout, useMe } from '@Api';
import { AuthorityEnum } from '@Common/types';
import { Avatar, Button, DropdownMenu } from '@Elements';

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
          <DropdownMenu.Menu
            trigger={
              <Avatar
                src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
                alt="test"
                fallback="AC"
              />
            }
          >
            <DropdownMenu.Item>{loggedInUser.username}</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item>
              <Button onClick={logout.mutate} size="small">
                Logout
              </Button>
            </DropdownMenu.Item>
          </DropdownMenu.Menu>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;

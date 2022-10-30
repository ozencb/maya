import { Link, useLocation } from 'react-router-dom';

import { useHasAuthority, useLogout, useMe } from '@Api';
import { AuthorityEnum } from '@Common/types';
import { Avatar, DropdownMenu } from '@Elements';

const NavBar = (): JSX.Element => {
  const { pathname } = useLocation();

  const logout = useLogout();
  const { data: loggedInUser } = useMe();
  const { data: hasAuthority } = useHasAuthority(
    AuthorityEnum['Access Admin Panel']
  );

  return (
    <nav className="flex flex-row justify-between items-center px-4 pt-1 h-12 select-none">
      <ul className="flex flex-row gap-2">
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>

      <ul>
        {loggedInUser && loggedInUser.username ? (
          <DropdownMenu.Menu
            trigger={
              <Avatar
                alt="test"
                fallback={loggedInUser.username}
                size="small"
              />
            }
          >
            <DropdownMenu.Item>
              <Link to="/profile">{loggedInUser.username}</Link>
            </DropdownMenu.Item>

            <DropdownMenu.Separator />

            {hasAuthority && (
              <DropdownMenu.Item>
                <Link to="/admin">Admin Panel</Link>
              </DropdownMenu.Item>
            )}
            <DropdownMenu.Item onClick={logout.mutate}>
              Logout
            </DropdownMenu.Item>
          </DropdownMenu.Menu>
        ) : (
          pathname !== '/sign' && <Link to="/sign">Sign In</Link>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;

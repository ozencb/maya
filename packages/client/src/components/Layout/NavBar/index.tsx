import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useHasAuthority, useLogout, useMe } from '@Api';
import { AuthorityEnum } from '@Common/types';
import { Avatar, DropdownMenu } from '@Elements';

import styles from './styles.module.scss';

const NavBar = (): JSX.Element => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const logout = useLogout();
  const { data: loggedInUser } = useMe();
  const { data: hasAuthority } = useHasAuthority(
    AuthorityEnum['Access Admin Panel']
  );

  return (
    <nav className={styles.container}>
      <div>
        <Link to="/">Home</Link>
      </div>

      <div>
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
      </div>
    </nav>
  );
};

export default NavBar;

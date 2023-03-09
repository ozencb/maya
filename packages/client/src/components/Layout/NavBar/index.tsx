import { Link, useLocation } from 'react-router-dom';

import { Avatar, DropdownMenu } from '@Elements';
import { trpc } from '@Lib';

import styles from './styles.module.scss';

const NavBar = (): JSX.Element => {
  const { pathname } = useLocation();

  const { mutate: logout } = trpc.auth.logout.useMutation();

  const { data: loggedInUser } = trpc.user.me.useQuery();
  const { data: hasAuthority } =
    trpc.auth.hasAuthority.useQuery('ACCESS_ADMIN_PANEL');

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
            <DropdownMenu.Item onClick={logout}>Logout</DropdownMenu.Item>
          </DropdownMenu.Menu>
        ) : (
          pathname !== '/sign' && <Link to="/sign">Sign In</Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;

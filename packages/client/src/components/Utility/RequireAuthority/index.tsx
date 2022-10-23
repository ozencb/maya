import { useMe } from '@Api';
import { AuthorityEnum } from '@Common/types';
import NoMatch from '@Pages/NoMatch';
import { checkAuthority } from '@Utils';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const RequireAuthority = ({
  children,
  requiredAuthorities,
}: {
  children: JSX.Element;
  requiredAuthorities: AuthorityEnum[];
}): JSX.Element => {
  const { data: loggedInUser } = useMe();

  if (!loggedInUser) return <NoMatch />;

  if (checkAuthority(loggedInUser.authorities, requiredAuthorities)) {
    return children;
  }

  return <NoMatch />;
};

export default RequireAuthority;

import { useMe } from '@Api';
import { AuthorityEnum } from '@Common/types';
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
  let location = useLocation();

  if (!loggedInUser)
    return <Navigate to="/" state={{ from: location }} replace />;

  if (checkAuthority(loggedInUser.authorities, requiredAuthorities)) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default RequireAuthority;

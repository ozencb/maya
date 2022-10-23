import { useHasAuthority, useMe } from '@Api';
import { AuthorityEnum } from '@Common/types';
import NoMatch from '@Pages/NoMatch';

const RequireAuthority = ({
  children,
  requiredAuthority,
}: {
  children: JSX.Element;
  requiredAuthority: AuthorityEnum;
}): JSX.Element => {
  const loggedInUser = useMe();
  const { data: hasAuthority } = useHasAuthority(requiredAuthority);

  if (!loggedInUser) return <NoMatch />;

  if (hasAuthority) {
    return children;
  }

  return <NoMatch />;
};

export default RequireAuthority;

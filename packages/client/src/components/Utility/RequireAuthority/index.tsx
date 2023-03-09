import { useHasAuthority, useMe } from '@Api';

import NoMatchPage from '@Pages/NoMatch';

const RequireAuthority = ({
  children,
  requiredAuthority,
}: {
  children: JSX.Element;
  requiredAuthority: string;
}): JSX.Element => {
  const loggedInUser = useMe();
  const { data: hasAuthority } = useHasAuthority(requiredAuthority);

  if (!loggedInUser) return <NoMatchPage />;

  if (hasAuthority) {
    return children;
  }

  return <NoMatchPage />;
};

export default RequireAuthority;

import { trpc } from '@Lib';

import NoMatchPage from '@Pages/NoMatch';

const RequireAuthority = ({
  children,
  requiredAuthority,
}: {
  children: JSX.Element;
  requiredAuthority: string;
}): JSX.Element => {
  const { data: loggedInUser } = trpc.user.me.useQuery();
  const { data: hasAuthority } =
    trpc.auth.hasAuthority.useQuery(requiredAuthority);

  if (!loggedInUser) return <NoMatchPage />;

  if (hasAuthority) {
    return children;
  }

  return <NoMatchPage />;
};

export default RequireAuthority;

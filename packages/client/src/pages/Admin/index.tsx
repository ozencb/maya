import { GenericList } from '@Elements';
import { trpc } from '@Lib';
import { Head } from '@UtilityComponents';

const AdminPage = (): JSX.Element => {
  const { data: userCount } = trpc.admin.userCount.useQuery();
  const { data: userRoles } = trpc.role.userRoles.useQuery();

  return (
    <>
      <Head title="Admin" />
      <div>Total users: {userCount}</div>
      <div>
        <GenericList
          data={userRoles}
          extractor={({ userId }) => userId}
          renderItem={({ username, roleDescription }) => (
            <div>
              {username} - {roleDescription}
            </div>
          )}
        />
      </div>
    </>
  );
};

export default AdminPage;

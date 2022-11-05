import { useRoles, useUserCount, useUserRoles } from '@Api';
import { GenericList } from '@Elements';
import { Head } from '@UtilityComponents';

const AdminPage = (): JSX.Element => {
  const { data: userCount } = useUserCount();
  const { data: userRoles } = useUserRoles();

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

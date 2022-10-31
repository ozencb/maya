import { useRoles, useUserCount, useUserRoles } from '@Api';
import { GenericList } from '@Elements';
import { Head } from '@UtilityComponents';

const AdminPage = (): JSX.Element => {
  const { data: userCount } = useUserCount();
  const { data: userRoles } = useUserRoles();

  return (
    <>
      <Head title="Admin" />
      <div className="text-3xl font-bold underline">Admin Panel</div>
      <div className="mt-4">Total users: {userCount}</div>
      <div className="mt-4">
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

import { useUserCount } from '@Api';
import { Head } from '@UtilityComponents';

const AdminPage = (): JSX.Element => {
  const { data: userCount } = useUserCount();

  return (
    <>
      <Head title="Admin" />
      <div className="text-3xl font-bold underline">Admin Panel</div>
      <div className="mt-4">Total users: {userCount}</div>
    </>
  );
};

export default AdminPage;

import { useMe } from '@Api';

const Home: React.FC = () => {
  const { data, status } = useMe();

  return (
    <div>
      Home
      {data?.username}
    </div>
  );
};

export default Home;

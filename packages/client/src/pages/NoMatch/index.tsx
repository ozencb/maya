import { Head } from '@UtilityComponents';

const NoMatchPage = (): JSX.Element => {
  return (
    <>
      <Head title="404" />
      <div className="text-3xl font-bold underline flex-1 flex justify-center items-center">
        404
      </div>
    </>
  );
};

export default NoMatchPage;

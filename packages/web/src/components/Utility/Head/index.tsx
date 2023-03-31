import { Helmet } from 'react-helmet-async';

type HeadProps = {
  title?: string;
  description?: string;
};

const Head = ({ title, description = 'A fullstack app' }: HeadProps = {}) => {
  return (
    <Helmet title={title ? `${title} | Maya` : undefined} defaultTitle="Maya">
      <meta name="description" content={description} />
    </Helmet>
  );
};

export default Head;

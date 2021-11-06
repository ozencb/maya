import React from 'react';

type LoadingProps = {
  content?: string;
};

const Loading: React.FC<LoadingProps> = ({ content = 'Loading...' }) => {
  // Add your custom spinner
  return <div>{content}</div>;
};

export default Loading;

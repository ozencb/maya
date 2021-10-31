import React from 'react';
import Link from 'next/link';

interface LinkButtonProps {
  title: string;
  href: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({ title, href }) => {
  return (
    <Link href={href} passHref>
      <button>{title}</button>
    </Link>
  );
};

export default LinkButton;

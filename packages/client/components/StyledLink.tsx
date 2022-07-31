import React from 'react';
import Link from 'next/link';

type StyledLinkProps = {
  title: string;
  href: string;
};

const StyledLink: React.FC<StyledLinkProps> = ({ title, href }) => {
  return (
    <Link href={href} passHref>
      {title}
    </Link>
  );
};

export default StyledLink;

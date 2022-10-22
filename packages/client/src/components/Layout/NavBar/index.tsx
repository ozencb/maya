import React from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  const links = [
    {
      path: '/',
      name: 'Home',
    },
    {
      path: '/admin',
      name: 'Admin',
    },
    {
      path: '/register',
      name: 'Register',
    },
    {
      path: '/login',
      name: 'Login',
    },
  ];

  return (
    <nav>
      <ul>
        {links.map((link) => (
          <li key={link.path}>
            <Link to={link.path}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;

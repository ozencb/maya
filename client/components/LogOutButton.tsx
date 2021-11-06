import React from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

import { AuthServices } from '../services';
import Button from './Button';

const LogOutButton: React.FC = () => {
  const router = useRouter();

  const handleLogOut = async () => {
    const toastLoadingId = toast.loading('Logging out');
    await AuthServices.logOut();
    toast.dismiss(toastLoadingId);
    router.push('/login');
  };

  return <Button onClick={handleLogOut}>Log Out</Button>;
};

export default LogOutButton;

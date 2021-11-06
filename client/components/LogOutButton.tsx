import React from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

import { AuthServices } from '../services';
import { setAuthenticated } from '../store/reducers/session';
import Button from './Button';

const LogOutButton: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    const toastLoadingId = toast.loading('Logging out');
    await AuthServices.logOut();
    dispatch(setAuthenticated(false));

    toast.dismiss(toastLoadingId);
    router.push('/login');
  };

  return <Button onClick={handleLogOut}>Log Out</Button>;
};

export default LogOutButton;

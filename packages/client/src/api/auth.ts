import http from '@Helpers/http';
import { useMutation } from '@tanstack/react-query';
import { SignFormFields } from '@Types/index';
import { queryClient } from '@Lib';

const login = ({ username, password }: SignFormFields) =>
  http({
    method: 'POST',
    url: 'auth/login',
    data: {
      username,
      password,
    },
  });

const register = ({ username, password }: SignFormFields) =>
  http({
    method: 'POST',
    url: 'auth/register',
    data: {
      username,
      password,
    },
  });

const logout = () =>
  http({
    method: 'POST',
    url: 'auth/logout',
  });

export const useLogin = () =>
  useMutation(login, {
    onSuccess: () => {
      queryClient.invalidateQueries(['me']);
    },
  });
export const useRegister = () => useMutation(register);
export const useLogout = () =>
  useMutation(logout, {
    onSuccess: () => {
      queryClient.invalidateQueries(['me']);
    },
  });

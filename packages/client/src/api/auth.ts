import { useMutation, useQuery } from '@tanstack/react-query';

import { http } from '@Helpers';
import { SignFormFields } from '@Types';
import { queryClient } from '@Lib';

const login = ({ username, password }: SignFormFields) =>
  http({
    method: 'POST',
    url: 'auth/login',
    data: {
      username,
      password,
    },
    options: {
      showMessageNotification: true,
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
    options: {
      showMessageNotification: true,
    },
  });

const logout = () =>
  http({
    method: 'POST',
    url: 'auth/logout',
    options: {
      showMessageNotification: true,
    },
  });

const hasAuthority = (authority: unknown): Promise<boolean> =>
  http({
    method: 'GET',
    url: 'auth/has-authority',
    data: {
      authority,
    },
  });

export const useLogin = () =>
  useMutation(login, {
    onSuccess: () => {
      queryClient.resetQueries(['me']);
      queryClient.resetQueries(['hasAuthority']);
    },
  });
export const useRegister = () =>
  useMutation(register, {
    onSuccess: () => {
      queryClient.resetQueries(['me']);
      queryClient.resetQueries(['hasAuthority']);
    },
  });
export const useLogout = () =>
  useMutation(logout, {
    onSuccess: () => {
      queryClient.resetQueries(['me']);
      queryClient.resetQueries(['hasAuthority']);
    },
  });

export const useHasAuthority = (requiredAuthority: unknown) =>
  useQuery(['hasAuthority'], () => hasAuthority(requiredAuthority), {
    enabled: !!queryClient.getQueryData(['me']),
  });

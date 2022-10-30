import { useMutation, useQuery } from '@tanstack/react-query';

import { http } from '@Helpers';
import { SignFormFields } from '@Types';
import { queryClient } from '@Lib';
import { AuthorityEnum } from '@Common/types';

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

const hasAuthority = (authority: AuthorityEnum): Promise<boolean> =>
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
      queryClient.invalidateQueries(['me']);
      queryClient.invalidateQueries(['hasAuthority']);
    },
  });
export const useRegister = () =>
  useMutation(register, {
    onSuccess: () => {
      queryClient.invalidateQueries(['me']);
      queryClient.invalidateQueries(['hasAuthority']);
    },
  });
export const useLogout = () =>
  useMutation(logout, {
    onSuccess: () => {
      queryClient.invalidateQueries(['me']);
      queryClient.invalidateQueries(['hasAuthority']);
    },
  });

export const useHasAuthority = (requiredAuthority: AuthorityEnum) =>
  useQuery(['hasAuthority'], () => hasAuthority(requiredAuthority));

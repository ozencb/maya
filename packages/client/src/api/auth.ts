import { User } from '@Common/types';
import http from '@Helpers/http';
import { useMutation, useQuery } from '@tanstack/react-query';
import { SignFormFields } from '@Types/index';

export const login = ({
  username,
  password,
}: SignFormFields): Promise<User[]> =>
  http({
    method: 'POST',
    url: 'auth/login',
    data: {
      username,
      password,
    },
  });

export const useLogin = () => useMutation(login);

export const register = ({
  username,
  password,
}: SignFormFields): Promise<boolean> =>
  http({
    method: 'POST',
    url: 'auth/register',
    data: {
      username,
      password,
    },
  });

export const useRegister = () => useMutation(register);

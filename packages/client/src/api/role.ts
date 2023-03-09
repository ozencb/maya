import { useQuery } from '@tanstack/react-query';

import { http } from '@Helpers';

const roles = (): Promise<Object[]> => http({ method: 'GET', url: 'role/all' });

const userRoles = (): Promise<Object[]> =>
  http({ method: 'GET', url: 'role/user-roles' });

export const useRoles = () =>
  useQuery(['roles'], roles, { refetchOnWindowFocus: false });
export const useUserRoles = () =>
  useQuery(['userRoles'], userRoles, { refetchOnWindowFocus: false });

import { useQuery } from '@tanstack/react-query';

import { http } from '@Helpers';
import { Role, UserRole } from '@Common/models';

const roles = (): Promise<Role[]> => http({ method: 'GET', url: 'role/all' });

const userRoles = (): Promise<UserRole[]> =>
  http({ method: 'GET', url: 'role/user-roles' });

export const useRoles = () =>
  useQuery(['roles'], roles, { refetchOnWindowFocus: false });
export const useUserRoles = () =>
  useQuery(['userRoles'], userRoles, { refetchOnWindowFocus: false });

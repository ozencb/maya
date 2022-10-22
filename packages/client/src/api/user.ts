import { User } from '@Common/types';
import http from '@Helpers/http';
import { useQuery } from '@tanstack/react-query';

export const getAll = (): Promise<User[]> =>
  http({ method: 'GET', url: 'user/all' });

export const useAllUsers = () => useQuery(['users'], getAll);

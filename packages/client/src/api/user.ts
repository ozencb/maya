import { UserDetail } from '@Common/types';
import http from '@Helpers/http';
import { useQuery } from '@tanstack/react-query';

export const me = (): Promise<UserDetail> =>
  http({ method: 'GET', url: 'user/me' });

export const useMe = () =>
  useQuery(['me'], me, { refetchOnWindowFocus: false });

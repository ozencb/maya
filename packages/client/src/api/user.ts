import { useQuery } from '@tanstack/react-query';

import { UserDetail } from '@Common/types';
import { http } from '@Helpers';

export const me = (): Promise<UserDetail> =>
  http({ method: 'GET', url: 'user/me' });

export const useMe = () =>
  useQuery(['me'], me, { refetchOnWindowFocus: false });

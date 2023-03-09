import { useQuery } from '@tanstack/react-query';

import { http } from '@Helpers';

export const me = (): Promise<unknown> =>
  http({ method: 'GET', url: 'user/me' });

export const useMe = () =>
  useQuery(['me'], me, { refetchOnWindowFocus: false });

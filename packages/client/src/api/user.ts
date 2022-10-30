import { useQuery } from '@tanstack/react-query';

import { UserNonSensitive } from '@Common/types';
import { http } from '@Helpers';

export const me = (): Promise<UserNonSensitive> =>
  http({ method: 'GET', url: 'user/me' });

export const useMe = () =>
  useQuery(['me'], me, { refetchOnWindowFocus: false });

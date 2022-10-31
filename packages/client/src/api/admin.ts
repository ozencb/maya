import { useQuery } from '@tanstack/react-query';

import { http } from '@Helpers';

export const userCount = (): Promise<number> =>
  http({ method: 'GET', url: 'admin/user-count' });

export const useUserCount = () =>
  useQuery(['userCount'], userCount, { refetchOnWindowFocus: false });

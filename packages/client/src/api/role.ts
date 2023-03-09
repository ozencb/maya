import { useQuery } from '@tanstack/react-query';

export const useRoles = () =>
  useQuery(['roles'], { refetchOnWindowFocus: false });
export const useUserRoles = () =>
  useQuery(['userRoles'], { refetchOnWindowFocus: false });

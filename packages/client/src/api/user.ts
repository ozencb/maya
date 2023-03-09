import { useQuery } from '@tanstack/react-query';

export const useMe = () =>
  useQuery(['me'], /* me, */ { refetchOnWindowFocus: false });

import { queryClient, trpc } from '@Lib';

export const useLogin = () =>
  trpc.auth.login.useMutation({
    onSuccess: () => {
      queryClient.resetQueries(['me']);
      queryClient.resetQueries(['hasAuthority']);
    },
  });
export const useRegister = () =>
  trpc.auth.register.useMutation({
    onSuccess: () => {
      queryClient.resetQueries(['me']);
      queryClient.resetQueries(['hasAuthority']);
    },
  });
export const useLogout = () =>
  trpc.auth.logout.useMutation({
    onSuccess: () => {
      queryClient.resetQueries(['me']);
      queryClient.resetQueries(['hasAuthority']);
    },
  });

export const useHasAuthority = (requiredAuthority: unknown) =>
  trpc.auth.hasAuthority
    .useQuery
    /*   ['hasAuthority'],
    () => hasAuthority(requiredAuthority),
    {
      enabled: !!queryClient.getQueryData(['me']),
    } */
    ();

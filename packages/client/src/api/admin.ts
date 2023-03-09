import { trpc } from '@Lib';

export const useUserCount = () => trpc.admin.userCount.useQuery();

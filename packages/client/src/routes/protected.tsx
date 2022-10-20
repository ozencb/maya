import { lazyImport } from '@Utils';

export const protectedRoutes = [
  {
    path: '/auth/*',
    element: <div>protected</div>,
  },
];

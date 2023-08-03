import { lazy } from 'react';

const AdminSettings = lazy(() => import('./pages/AdminSettings'));

const UserSettingsConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: '/apps/settings',
      element: <AdminSettings />
    },
  ],
};

export default UserSettingsConfig;

import i18next from 'i18next';
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const UserSetting = lazy(() => import('./UserSettings'));

const UserSettingsConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: '/apps/settings',
    },
  ],
};

export default UserSettingsConfig;

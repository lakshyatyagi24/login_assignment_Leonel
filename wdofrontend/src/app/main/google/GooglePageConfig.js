import { lazy } from 'react';
import authRoles from '../../auth/authRoles';

const GooglePage = lazy(() => import('./GooglePage'));

const googlePageConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false,
        },
        toolbar: {
          display: false,
        },
        footer: {
          display: false,
        },
        leftSidePanel: {
          display: false,
        },
        rightSidePanel: {
          display: false,
        },
      },
    },
  },
  auth: authRoles.onlyguest,
  routes: [
    {
      path: 'google',
      element: <GooglePage />,
    },
  ],
};

export default googlePageConfig;

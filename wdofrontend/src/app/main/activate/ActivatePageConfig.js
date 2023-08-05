import { lazy } from 'react';
import authRoles from '../../auth/authRoles';

const ActivatePage = lazy(() => import('./ActivatePage'));

const activatePageConfig = {
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
      path: 'activate/:token',
      element: <ActivatePage />,
    },
  ],
};

export default activatePageConfig;

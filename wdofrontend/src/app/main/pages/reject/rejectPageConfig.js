import { lazy } from 'react';

const RejectPage = lazy(() => import('./RejectPage'));

const rejectPageConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'pages/reject',
      element: <RejectPage />,
    },
  ],
};

export default rejectPageConfig;

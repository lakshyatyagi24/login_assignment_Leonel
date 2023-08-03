import { lazy } from 'react';
import AllUser from './alluser/AllUser';
import CreateUser from './createuser/CreateUser';

const UserManagement = lazy(() => import('./UserManagement'));

const UserManagementConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: '/apps/user',
      element: <UserManagement />,
      children: [
        {
          path: 'create-new-user',
          element: <CreateUser />,
        },
        {
          path: 'get-all-user',
          element: <AllUser />
        }
      ],
    },
  ],
};

export default UserManagementConfig;

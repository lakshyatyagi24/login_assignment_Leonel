import { lazy } from 'react';
import CreateUser from './createuser/CreateUser';
import Orders from './alluser/orders/Orders';
import Order from './alluser/order/Order';

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
          path: 'get-all-users',
          element: <Orders />
        },
        {
          path: 'get-details/:userId',
          element: <Order />,
        }
      ],
    },
  ],
};

export default UserManagementConfig;

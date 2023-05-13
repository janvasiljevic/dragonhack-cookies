import AuthLayout from '@/layouts/AuthLayout';
import NavBarLayout from '@/layouts/NavBarLayout';

import LoginPage from '@/pages/LoginPage';
import NotFoundPage from '@/pages/NotFoundPage';
import ProfilePage from '@/pages/ProfilePage';
import TimelinePage from '@/pages/TimelinePage';

import { createBrowserRouter } from 'react-router-dom';

export type ProfileParams = {
  userId: string;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <AuthLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/',
        element: <NavBarLayout />,
        children: [
          {
            path: '/profile/:userId',
            element: <ProfilePage />,
          },
          {
            path: '/timeline',
            element: <TimelinePage />,
          },
        ],
      },
    ],
  },
]);

export default router;

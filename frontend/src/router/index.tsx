import AuthLayout from '@/layouts/AuthLayout';

import LoginPage from '@/pages/LoginPage';
import NotFoundPage from '@/pages/NotFoundPage';
import ProfilePage from '@/pages/ProfilePage';

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
        path: '/profile/:userId',
        element: <ProfilePage />,
      },
    ],
  },
]);

export default router;

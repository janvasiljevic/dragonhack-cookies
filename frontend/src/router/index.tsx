import AuthLayout from '@/layouts/AuthLayout';
import NavBarLayout from '@/layouts/NavBarLayout';
import BookPage from '@/pages/BookPage';
import ExplorePage from '@/pages/ExplorePage';

import LoginPage from '@/pages/LoginPage';
import NotFoundPage from '@/pages/NotFoundPage';
import ProfilePage from '@/pages/ProfilePage';
import TimelinePage from '@/pages/TimelinePage';

import { createBrowserRouter } from 'react-router-dom';

export type ProfileParams = {
  userId: string;
};

export type BookParams = {
  bookId: string;
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
            path: '/book/:bookId',
            element: <BookPage />,
          },
          {
            path: '/timeline',
            element: <TimelinePage />,
          },
          {
            path: '/explore',
            element: <ExplorePage />,
          },
        ],
      },
    ],
  },
]);

export default router;

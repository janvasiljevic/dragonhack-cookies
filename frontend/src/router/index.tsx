import AuthLayout from "@/layouts/AuthLayout";

import LoginPage from "@/pages/LoginPage";
import NotFoundPage from "@/pages/NotFoundPage";

import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <AuthLayout />,
    errorElement: <NotFoundPage />,
    children: [],
  },
]);

export default router;

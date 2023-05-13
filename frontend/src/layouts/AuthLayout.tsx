import { useCheckAuth } from '@/api/auth/auth';
import useAxiosAuthInterceptorHook from '@/hooks/axiosAuthIntereptorHook';
import { useUserStore } from '@/store';
import { showNotification } from '@mantine/notifications';
import { useEffect } from 'react';
import { useNavigate, useOutlet } from 'react-router-dom';

const AuthLayout = () => {
  const outlet = useOutlet();
  const navigate = useNavigate();

  //   const isAxiosReady = useAxiosAuthInterceptorHook();

  //   const checkStatus = useCheckAuth({
  //     query: {
  //       enabled: isAxiosReady,
  //       onError(e) {
  //         unAuth();
  //       },
  //       onSuccess({ facultyCode, role, username }) {
  //         user.setAll({
  //           facultyCode,
  //           role,
  //           username,
  //         });
  //       },
  //     },
  //   });

  //   const unAuth = () => {
  //     // showNotification({
  //     //   title: t("notifications.401.title"),
  //     //   message: t("notifications.401.message"),
  //     // });

  //     user.clearAll();
  //     navigate("/");
  //   };

  //   useEffect(() => {
  //     if (!user.getToken()) return unAuth();

  //     checkStatus.refetch();
  //   }, []);

  //   if (!isAxiosReady) return <></>;

  return <> {outlet}</>;
};

export default AuthLayout;

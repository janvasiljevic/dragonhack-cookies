import { useAuthControllerProfile } from '@/api/auth/auth';
import { useAppStore } from '@/store';
import { showNotification } from '@mantine/notifications';
import { useNavigate, useOutlet } from 'react-router-dom';

const AuthLayout = () => {
  const outlet = useOutlet();
  const navigate = useNavigate();

  const setUser = useAppStore((s) => s.setUser);
  const clearAllUserData = useAppStore((s) => s.clearAllUserDatas);

  useAuthControllerProfile({
    query: {
      onError() {
        unAuth();
      },
      onSuccess(data) {
        setUser(data);
      },
    },
  });

  const unAuth = () => {
    showNotification({
      title: 'Unauthorized',
      message: 'Get debooked',
    });

    clearAllUserData();
    navigate('/');
  };

  return <> {outlet}</>;
};

export default AuthLayout;

import { useAuthControllerLogin } from '@/api/auth/auth';
import background from '@/assets/login.jpg';
import {
  Box,
  Button,
  Flex,
  Group,
  TextInput,
  Title,
  createStyles,
  rem,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { IconLock, IconMail } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

type FormValues = z.infer<typeof loginSchema>;

const useStyles = createStyles((t) => ({
  bg: {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    filter: 'grayscale(1) brightness(0.4)',
  },
  flare: {
    background: `linear-gradient(0deg, rgba(2,0,36,1) 0%, ${t.fn.rgba(
      t.fn.primaryColor(),
      0.3,
    )} 42%, rgba(0,0,0,0) 100%)`,
    opacity: 0.8,
  },
  inputBox: {
    background: 'white',
    minWidth: rem(300),
    maxWidth: rem(400),
    width: '100%',
    padding: rem(50),
    position: 'relative',
    zIndex: 1,
    boxShadow: t.shadows.xl,
    border: `3px solid ${t.colors.gray[9]}`,

    borderRadius: t.radius.sm,
  },
}));

const LoginPage = () => {
  const navigate = useNavigate();
  const { classes: c } = useStyles();

  const login = useAuthControllerLogin({
    mutation: {
      onSuccess: () => {
        navigate('/explore');
      },
      onError: (error) => {
        showNotification({
          title: 'Login failed',
          message: 'Please try again.',
          color: 'red',
        });
      },
    },
  });

  const form = useForm({
    validate: zodResolver(loginSchema),
    initialValues: {
      email: '',
      password: '',
    } as FormValues,
  });

  const onSubmit = (values: FormValues) => {
    login.mutate({ data: values });
  };

  return (
    <Flex
      w="100vw"
      h="100vh"
      sx={{ overflow: 'hidden', position: 'relative' }}
      justify="center"
      align="center"
    >
      <Box className={c.bg} w="100%" h="100%" sx={{ position: 'absolute' }} />
      <Box
        className={c.flare}
        w="100%"
        h="100%"
        sx={{ position: 'absolute' }}
      />
      <motion.div
        animate={{ opacity: 1, transform: 'scale(1,1)' }}
        initial={{ opacity: 0, transform: 'scale(0,1)' }}
        transition={{ duration: 0.3 }}
        className={c.inputBox}
      >
        <Title order={2} align="center" mb="md">
          LilLib
        </Title>
        <form onSubmit={form.onSubmit(onSubmit)}>
          <TextInput
            placeholder="your@email.com"
            label="Email"
            icon={<IconMail />}
            {...form.getInputProps('email')}
          />

          <TextInput
            label="Password"
            type="password"
            placeholder="your password"
            icon={<IconLock />}
            {...form.getInputProps('password')}
          />

          <Group position="apart" mt="md">
            <Button variant="subtle" onClick={() => navigate('/register')}>
              Register
            </Button>
            <Button type="submit" variant="outline">
              Login
            </Button>
          </Group>
        </form>
      </motion.div>
    </Flex>
  );
};

export default LoginPage;

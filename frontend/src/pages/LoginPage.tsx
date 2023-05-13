import { useAuthControllerLogin } from '@/api/auth/auth';
import { Box, Button, Flex, Group, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

type FormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const navigate = useNavigate();

  const login = useAuthControllerLogin({
    mutation: {
      onSuccess: () => {
        navigate('/timeline');
      },
      onError: (error) => {
        showNotification({
          title: 'Login failed',
          message: error.message,
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
      sx={{ overflow: 'hidden' }}
      justify="center"
      align="center"
    >
      <Box maw={300} mx="auto">
        <form onSubmit={form.onSubmit(onSubmit)}>
          <TextInput
            withAsterisk
            label="Username"
            placeholder="your@email.com"
            {...form.getInputProps('email')}
          />

          <TextInput
            withAsterisk
            label="Password"
            {...form.getInputProps('password')}
          />

          <Group position="right" mt="md">
            <Button type="submit">Login</Button>
          </Group>
        </form>
      </Box>
    </Flex>
  );
};

export default LoginPage;

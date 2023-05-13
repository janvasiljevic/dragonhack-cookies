import { Flex } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().min(3),
  password: z.string().min(3),
});

type FormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const navigate = useNavigate();

  const form = useForm({
    validate: zodResolver(loginSchema),
    initialValues: {
      email: '',
      password: '',
    } as FormValues,
  });

  return <Flex w="100vw" h="100vh" sx={{ overflow: 'hidden' }} pos="relative" align="end" justify="center"></Flex>;
};

export default LoginPage;

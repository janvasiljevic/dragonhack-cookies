import { useBookControllerCreate } from '@/api/book/book';
import { Button, Group, Text, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { ContextModalProps } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { IconBook2, IconPlus } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';

import { z } from 'zod';

const isbnSchema = z.object({
  isbn: z.string(),
});

type FormValues = z.infer<typeof isbnSchema>;

// eslint-disable-next-line no-empty-pattern
const AddBook = ({ context }: ContextModalProps) => {
  const form = useForm({
    validate: zodResolver(isbnSchema),
    initialValues: {
      isbn: '',
    } as FormValues,
  });

  const { mutateAsync: addBook } = useBookControllerCreate({
    mutation: {
      onSuccess: (data) => {
        showNotification({
          message: `Successfully added book ${data.title} by ${data.author}`,
          title: 'Book added',
        });
      },
      onError: (error) => {
        showNotification({
          message: 'Please try again.',
          title: 'Failed to add book',
        });
      },
    },
  });

  const queryClient = useQueryClient();

  const onSubmit = async (values: FormValues) => {
    await addBook({ data: { isbn: values.isbn } });

    await queryClient.invalidateQueries({
      queryKey: ['user'],
    });
    context.closeAll();
  };

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Text c={'dimmed'}>
        Currently only adding by ISBN is supported. When we get the massive
        initial funding we will add more user friendly options.{' '}
      </Text>
      <TextInput
        placeholder="xxx-x-xx-xxxxxx-x"
        label="ISBN"
        icon={<IconBook2 />}
        {...form.getInputProps('isbn')}
      />

      <Group position="right" mt="md">
        <Button leftIcon={<IconPlus />} type="submit" variant="outline">
          Confirm
        </Button>
      </Group>
    </form>
  );
};

export default AddBook;

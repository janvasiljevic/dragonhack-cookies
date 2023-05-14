import { useBookControllerSearch } from '@/api/book/book';
import {
  Box,
  Button,
  Container,
  Flex,
  LoadingOverlay,
  Stack,
  Text,
  TextInput,
  createStyles,
  rem,
} from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { IconBook2 } from '@tabler/icons-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles((t) => ({
  bookSlim: {
    padding: t.spacing.md,
    borderBottom: `1px solid ${t.colors.gray[4]}`,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  textBookTitle: {
    fontSize: rem(20),
    fontFamily: t.fontFamilyMonospace,
  },
  textAuthor: {
    fontSize: rem(12),
  },
}));

const ExplorePage = () => {
  const [search, setSearch] = React.useState('harr');
  const [debounced] = useDebouncedValue(search, 200);
  const { data: searchData } = useBookControllerSearch(debounced);
  const { classes: c } = useStyles();
  const navigate = useNavigate();

  return (
    <Container w="100%">
      <TextInput
        label="Search"
        onChange={(e) => setSearch(e.currentTarget.value)}
        value={search}
        pb="xl"
      />
      <Stack w="100%" spacing="xl">
        {searchData?.map((book) => (
          <Flex key={book.id} className={c.bookSlim}>
            <Flex direction={'column'}>
              <Text className={c.textBookTitle}>{book.title}</Text>
              <Text className={c.textAuthor}>{book.author}</Text>
            </Flex>
            <Box sx={{ flexGrow: 1 }} />
            <Button
              variant="outline"
              leftIcon={<IconBook2 />}
              onClick={() => navigate(`/book/${book.id}`)}
            >
              Book
            </Button>
          </Flex>
        ))}
      </Stack>
    </Container>
  );
};

export default ExplorePage;

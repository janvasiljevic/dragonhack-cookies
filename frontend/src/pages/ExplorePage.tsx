import { useBookControllerSearch } from '@/api/book/book';
import { useRecomendationsControllerGetRecomendations } from '@/api/recomendations/recomendations';
import BookDisplay from '@/components/BoookDisplay';
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Loader,
  ScrollArea,
  Stack,
  Text,
  TextInput,
  Title,
  UnstyledButton,
  createStyles,
  rem,
} from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { IconBook2 } from '@tabler/icons-react';
import { AnimatePresence, m, motion } from 'framer-motion';
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
  flexLibrary: {
    display: 'flex',
    flexDirection: 'row',
  },
}));

const ExplorePage = () => {
  const [search, setSearch] = React.useState('');
  const [debounced] = useDebouncedValue(search, 200);
  const { data: searchData } = useBookControllerSearch(debounced);
  const { classes: c } = useStyles();
  const navigate = useNavigate();

  const { data: reccomendationsData, isLoading } =
    useRecomendationsControllerGetRecomendations({
      query: { refetchOnMount: true },
    });

  return (
    <Container w="100%">
      <AnimatePresence>
        {search === '' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Title order={2}> Find your next book</Title>
            <Text> Find books others have and are willing to share </Text>
          </motion.div>
        )}
      </AnimatePresence>
      <TextInput
        placeholder={
          ['To kill a mockingbird', 'The Great Gatsby', 'Hobbit'][
            Math.floor(Math.random() * 3)
          ]
        }
        onChange={(e) => setSearch(e.currentTarget.value)}
        value={search}
        size="lg"
        icon={<IconBook2 />}
        pb="xl"
      />
      <AnimatePresence>
        <Stack w="100%" spacing="xl">
          {search !== '' &&
            searchData?.map((book) => (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                key={book.id}
              >
                <Flex className={c.bookSlim}>
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
              </motion.div>
            ))}
        </Stack>
      </AnimatePresence>
      <AnimatePresence>
        {' '}
        {search === '' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Flex direction="column">
              <Title order={2}>Reccomendations </Title>
              <Text>Based on your reading history</Text>
            </Flex>
            <ScrollArea pt="lg" className={c.flexLibrary}>
              <Flex gap="md">
                {isLoading && (
                  <Center w="100%">
                    {' '}
                    <Loader />{' '}
                  </Center>
                )}
                <AnimatePresence>
                  {reccomendationsData?.map((book) => (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <UnstyledButton
                        key={book.id}
                        onClick={() => navigate(`/book/${book.id}`)}
                        style={{
                          height: rem(300),
                          width: rem(180),
                          flexShrink: 0,
                        }}
                      >
                        <BookDisplay book={book} />
                      </UnstyledButton>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </Flex>
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default ExplorePage;

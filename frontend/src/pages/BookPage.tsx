import { useBookControllerFindOne } from '@/api/book/book';
import BookDisplay from '@/components/BoookDisplay';
import { BookParams } from '@/router';
import {
  Box,
  Container,
  createStyles,
  Flex,
  Grid,
  rem,
  Text,
} from '@mantine/core';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';

const useStyles = createStyles((t) => ({
  flex: {
    display: 'flex',
    flexDirection: 'row',

    [t.fn.smallerThan('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  flex2: {
    marginLeft: rem(20),
    [t.fn.smallerThan('sm')]: {
      marginLeft: rem(0),
    },
  },
  title: {
    fontSize: rem(50),
    fontWeight: 100,
    opacity: 0.8,
    fontFamily: t.headings.fontFamily,
  },
  author: {
    fontSize: rem(20),
    fontWeight: 700,
    fontFamily: t.fontFamilyMonospace,
  },
}));

const BookPage = () => {
  const { bookId } = useParams<BookParams>();
  const { classes: c } = useStyles();

  const { data } = useBookControllerFindOne(bookId || '', {
    query: { enabled: !!bookId },
  });

  if (!data) {
    return null;
  }

  return (
    <Container size="md" w={'100%'}>
      <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
        <Flex className={c.flex}>
          <Box style={{ width: rem(300), height: rem(420) }}>
            <BookDisplay book={data} />
          </Box>
          <Flex direction="column" className={c.flex2}>
            <Text className={c.title}> {data.title}</Text>
            <Text className={c.author}> {data.author}</Text>
          </Flex>
        </Flex>
      </motion.div>
    </Container>
  );
};

export default BookPage;

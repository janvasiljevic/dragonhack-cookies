import { useBookControllerFindOne } from '@/api/book/book';
import {
  useBorrowControllerCancleReservation,
  useBorrowControllerGetBookReservations,
  useBorrowControllerReserve,
} from '@/api/borrow/borrow';
import BookDisplay from '@/components/BoookDisplay';
import { BookParams } from '@/router';
import { useAppStore } from '@/store';
import {
  Box,
  Button,
  Container,
  createStyles,
  Flex,
  Group,
  rem,
  Stack,
  Text,
  Title,
  UnstyledButton,
} from '@mantine/core';
import { IconBook2, IconX } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';

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
  sectionTitles: {
    marginTop: t.spacing.lg,
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
  const user = useAppStore((state) => state.user);
  const navigate = useNavigate();

  // Fetch book data
  const { data: bookData } = useBookControllerFindOne(bookId || '', {
    query: { enabled: !!bookId },
  });

  // Fetch reservation data about the book
  const { data: reservationData, refetch: refetchReservationData } =
    useBorrowControllerGetBookReservations(bookId || '', {
      query: { enabled: !!bookId },
    });

  // Mutations
  const { mutateAsync: reserveBook } = useBorrowControllerReserve();
  const { mutateAsync: cancelReservation } =
    useBorrowControllerCancleReservation();

  // Handlers
  const reserveBookClick = async (bookId: string) => {
    await reserveBook({ bookId });
    await refetchReservationData();
  };

  const cancelReservationClick = async (reservationId: string) => {
    await cancelReservation({ reservationId });
    await refetchReservationData();
  };

  // Check if the user is the owner of the book
  const isBookOwner = user?.id === bookData?.ownerId;

  // Check if the user has already reserved the book
  const youHaveReservedThisBook = reservationData?.some(
    (reservation) => reservation.userId === user?.id,
  );

  if (!bookData) {
    return null;
  }

  return (
    <Container size="md" w={'100%'}>
      <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
        <Flex className={c.flex}>
          <Box style={{ width: rem(300), height: rem(420) }}>
            <BookDisplay book={bookData} />
          </Box>
          <Flex direction="column" className={c.flex2}>
            <Text className={c.title}> {bookData.title}</Text>
            <Text className={c.author}> {bookData.author}</Text>
          </Flex>
        </Flex>

        {isBookOwner && reservationData && (
          <Stack spacing="xs" mt={20}>
            <Title order={1} className={c.sectionTitles}>
              Pending reservations
            </Title>
            {reservationData.map((r) => (
              <Group spacing="xs" key={r.id} position="apart">
                <UnstyledButton
                  onClick={() => navigate(`/profile/${r.userId}`)}
                >
                  <Text>
                    {r.user.firstName} {r.user.lastName}
                  </Text>
                </UnstyledButton>
                <Group spacing="xs">
                  <Button
                    onClick={() => cancelReservationClick(r.id)}
                    variant="light"
                    color="teal"
                    leftIcon={<IconX />}
                  >
                    Accept
                  </Button>
                  <Button
                    onClick={() => cancelReservationClick(r.id)}
                    variant="light"
                    color="red"
                    leftIcon={<IconX />}
                  >
                    Cancel
                  </Button>
                </Group>
              </Group>
            ))}
          </Stack>
        )}

        {!isBookOwner &&
          bookData.status === 'AVAILABLE' &&
          !youHaveReservedThisBook && (
            <Group spacing="xs" mt={20} w="100%" position="apart">
              <Text> This book is currently available! </Text>
              <Button
                onClick={() => reserveBookClick(bookData.id)}
                variant="outline"
                leftIcon={<IconBook2 />}
              >
                Request book
              </Button>
            </Group>
          )}

        {!isBookOwner &&
          bookData.status === 'AVAILABLE' &&
          youHaveReservedThisBook && (
            <Group spacing="xs" mt={20} w="100%" position="apart">
              <Text> You have already reserved this book </Text>
              <Button
                onClick={() => reserveBookClick(bookData.id)}
                variant="outline"
                leftIcon={<IconX />}
              >
                Cancel reservation
              </Button>
            </Group>
          )}

        {!isBookOwner && bookData.status !== 'AVAILABLE' && (
          <Group spacing="xs" mt={20} w="100%" position="apart">
            <Text> This book is currently un-available </Text>
            <Button variant="outline" leftIcon={<IconBook2 />} disabled>
              Request book
            </Button>
          </Group>
        )}
      </motion.div>
    </Container>
  );
};

export default BookPage;

import {
  useBookControllerFindOne,
  useBookControllerLike,
} from '@/api/book/book';
import {
  useBorrowControllerAcceptReservation,
  useBorrowControllerCancelReservation,
  useBorrowControllerGetBookReservations,
  useBorrowControllerReserve,
  useBorrowControllerReturnBook,
} from '@/api/borrow/borrow';
import BookDisplay from '@/components/BoookDisplay';
import { BookParams } from '@/router';
import { useAppStore } from '@/store';
import {
  Box,
  Button,
  Container,
  createStyles,
  Divider,
  Flex,
  Group,
  rem,
  Stack,
  Text,
  Title,
  UnstyledButton,
} from '@mantine/core';
import { IconHeartFilled } from '@tabler/icons-react';
import { IconCheck } from '@tabler/icons-react';
import {
  IconBook2,
  IconExclamationCircle,
  IconHandClick,
  IconHandGrab,
  IconHeart,
  IconUser,
  IconX,
} from '@tabler/icons-react';
import { parseISO } from 'date-fns';
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
  desc: {
    fontSize: t.fontSizes.lg,
  },
}));

const BookPage = () => {
  const { bookId } = useParams<BookParams>();
  const { classes: c } = useStyles();
  const user = useAppStore((state) => state.user);
  const navigate = useNavigate();

  // Fetch book data
  const { data: bookData, refetch: refetchBookData } = useBookControllerFindOne(
    bookId || '',
    {
      query: { enabled: !!bookId },
    },
  );

  // Fetch reservation data about the book
  const { data: reservationData, refetch: refetchReservationData } =
    useBorrowControllerGetBookReservations(bookId || '', {
      query: { enabled: !!bookId },
    });

  // Mutations
  const { mutateAsync: reserveBook } = useBorrowControllerReserve();
  const { mutateAsync: cancelReservation } =
    useBorrowControllerCancelReservation();
  const { mutateAsync: returnBook } = useBorrowControllerReturnBook();
  const { mutateAsync: acceptReservation } =
    useBorrowControllerAcceptReservation();

  const { mutateAsync: likeBook } = useBookControllerLike();

  // Handlers
  const reserveBookClick = async (bookId: string) => {
    await reserveBook({ bookId });
    await refetchReservationData();
  };

  const likeButton = async (bookId: string, liked: boolean) => {
    await likeBook({ bookId, liked });
    await refetchBookData();
  };

  const cancelReservationClick = async (reservationId: string) => {
    await cancelReservation({ reservationId });
    await refetchReservationData();
    await refetchBookData();
  };

  const acceptReservationClick = async (reservationId: string) => {
    await acceptReservation({ reservationId });
    await refetchReservationData();
    await refetchBookData();
  };

  const returnBookClick = async (bookId: string) => {
    await returnBook({ bookId: bookId });
    await refetchReservationData();
  };

  const cancelOwnReservationClick = async () => {
    // Find the reservation id of the user
    const reservationId = reservationData?.find(
      (reservation) => reservation.userId === user?.id,
    )?.id;

    if (!reservationId) {
      return;
    }

    await cancelReservation({ reservationId });
    await refetchReservationData();
  };

  // Check if the user is the owner of the book
  const isBookOwner = user?.id === bookData?.ownerId;
  const youHaveBookInPossesion = bookData?.borrowerId === user?.id;
  const youLikeTheBook = bookData?.likedBy?.some(
    (like) => like.id === user?.id,
  );

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
          <Box style={{ width: rem(300), height: rem(420), flexShrink: 0 }}>
            <BookDisplay book={bookData} />
          </Box>
          <Flex direction="column" className={c.flex2}>
            <Text className={c.title}> {bookData.title}</Text>
            <Text className={c.author}> {bookData.author}</Text>
            <Text className={c.desc}>{bookData.description}</Text>
            {!isBookOwner && (
              <Stack pt="lg">
                <Flex align="center">
                  <Text c="dimmed">This book belongs to</Text>

                  <Button
                    onClick={() => navigate(`/profile/${bookData.ownerId}`)}
                    variant="subtle"
                    leftIcon={<IconUser />}
                  >
                    {bookData.owner.firstName} {bookData.owner.lastName}
                  </Button>
                </Flex>
              </Stack>
            )}
          </Flex>
        </Flex>
        <Group mt="lg">
          <Button
            variant="light"
            leftIcon={youLikeTheBook ? <IconHeartFilled /> : <IconHeart />}
            onClick={() => likeButton(bookData?.id, !youLikeTheBook)}
          >
            {youLikeTheBook ? 'Liked' : 'Like'}
            <span style={{ marginLeft: rem(10), opacity: 0.8 }}>
              {bookData.likedBy.length}
            </span>
          </Button>
          <Text c="dimmed">
            Let the community know you enjoyed the book and receive personalized
            reccomendations!
          </Text>
        </Group>
        <Divider my="lg" />

        {isBookOwner && reservationData && bookData.status === 'AVAILABLE' && (
          <Stack spacing="xs" mt={20}>
            <Title order={1} className={c.sectionTitles}>
              Pending reservations
            </Title>
            {reservationData.map((r) => (
              <Group spacing="xs" key={r.id} position="apart">
                <UnstyledButton
                  onClick={() => navigate(`/profile/${r.userId}`)}
                >
                  <Text style={{ textDecoration: 'underline' }}>
                    {r.user.firstName} {r.user.lastName}
                  </Text>
                </UnstyledButton>
                <Group spacing="xs">
                  <Button
                    onClick={() => acceptReservationClick(r.id)}
                    variant="light"
                    color="teal"
                    leftIcon={<IconCheck />}
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

        {isBookOwner && bookData && bookData.borrower && (
          <>
            <Flex mt={20} align="center">
              <Text>Borrowed by</Text>
              <Button
                variant="subtle"
                leftIcon={<IconUser />}
                onClick={() => navigate(`/profile/${bookData.borrowerId}`)}
              >
                <Text style={{ textDecoration: 'underline' }}>
                  {bookData.borrower.firstName} {bookData.borrower.lastName}
                </Text>
              </Button>
              <Text>
                until {parseISO(bookData.returnDate || '').toLocaleDateString()}
              </Text>
            </Flex>
            <Text c="dimmed" mt="md">
              When the other user returns the book to you, please confirm it{' '}
            </Text>
            <Group position="apart" mt="sm">
              <Button
                onClick={() => returnBookClick(bookData.id)}
                leftIcon={<IconHandGrab />}
                variant="subtle"
              >
                The book was already returned
              </Button>
              <Button
                leftIcon={<IconExclamationCircle />}
                variant="subtle"
                color="red"
              >
                File a despute
              </Button>
            </Group>
          </>
        )}

        {!isBookOwner &&
          bookData.status === 'AVAILABLE' &&
          !youHaveReservedThisBook && (
            <Group spacing="xs" mt={20} w="100%" position="apart">
              <Text> This book is currently available! </Text>
              <Button
                onClick={() => reserveBookClick(bookData.id)}
                variant="light"
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
                onClick={() => cancelOwnReservationClick()}
                variant="light"
                leftIcon={<IconX />}
                color="red"
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

        {youHaveBookInPossesion && (
          <Group spacing="xs" mt={20} w="100%">
            <IconBook2 />
            <Text c="dimmed"> You have this book in your possesion </Text>
            <Text c="pink">
              {' '}
              You have till{' '}
              {parseISO(bookData.returnDate || '').toLocaleDateString()} to
              return it
            </Text>
          </Group>
        )}
      </motion.div>
    </Container>
  );
};

export default BookPage;

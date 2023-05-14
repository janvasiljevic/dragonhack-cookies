import { useBorrowControllerGetOwnerReservations } from '@/api/borrow/borrow';
import { useUserControllerFindOne } from '@/api/user/user';
import BookDisplay from '@/components/BoookDisplay';
import { ProfileParams } from '@/router';
import { useAppStore } from '@/store';
import {
  Blockquote,
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Group,
  ScrollArea,
  Text,
  Timeline,
  Title,
  UnstyledButton,
  createStyles,
  rem,
} from '@mantine/core';
import { openContextModal } from '@mantine/modals';
import {
  IconBook,
  IconBook2,
  IconGitBranch,
  IconGitCommit,
  IconHeart,
  IconPlus,
} from '@tabler/icons-react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

const useStyles = createStyles((t) => ({
  username: {
    fontSize: rem(20),
  },
  sectionTitles: {
    marginTop: t.spacing.lg,
  },
  statBlock: {
    borderColor: t.colors.gray[4],
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
  },
  value: {
    fontSize: rem(30),
    fontFamily: t.headings.fontFamily,
    fontWeight: 700,
    color: t.fn.primaryColor(),
  },
  desc: {
    fontSize: rem(12),
  },
  icon: {
    color: t.colors.gray[6],
  },
  flexLibrary: {
    display: 'flex',
    flexDirection: 'row',
  },
  t1: {
    fontSize: rem(20),
    color: t.fn.primaryColor(),
  },
  t2: {
    color: t.fn.dimmed(),
  },
  t3: {
    color: t.fn.dimmed(),
  },
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

type Props = {
  title: string;
  value: string;
  icon: React.ReactNode;
};

const StatBlock = ({ title, value, icon }: Props) => {
  const { classes: c } = useStyles();

  return (
    <Card className={c.statBlock}>
      <Flex w="100%" justify="space-between" direction="row">
        <Text className={c.value}>{value}</Text>
        <Box className={c.icon}>{icon}</Box>
      </Flex>
      <Text transform="uppercase" className={c.desc}>
        {title}
      </Text>
    </Card>
  );
};

const ProfilePage = () => {
  const { userId } = useParams<ProfileParams>();
  const { classes: c } = useStyles();
  const user = useAppStore((state) => state.user);
  const navigate = useNavigate();

  const { data: userProfileData, isLoading } = useUserControllerFindOne(
    userId || '',
    {
      query: {
        enabled: !!userId,
        queryKey: ['user'],
      },
    },
  );

  const isCurrentUser = user && user.id === userId;

  const { data: resData } = useBorrowControllerGetOwnerReservations(
    userId || '',
    {
      query: {
        enabled: !!isCurrentUser,
      },
    },
  );

  if (isLoading || !userProfileData) {
    return <div> Loading... </div>;
  }

  return (
    <Container size="md" w={'100%'}>
      <Flex direction="column">
        <Text className={c.username}>
          {userProfileData.firstName} {userProfileData.lastName}
        </Text>
        <Grid mt="lg">
          <Grid.Col sm={4}>
            <StatBlock
              title="Books owned"
              value={userProfileData.ownedBooks.length + ''}
              icon={<IconBook />}
            />
          </Grid.Col>
          <Grid.Col sm={4}>
            <StatBlock
              title="Books read"
              value={userProfileData.numberOfBooksRead + ''}
              icon={<IconBook2 />}
            />
          </Grid.Col>
          <Grid.Col sm={4}>
            <StatBlock
              title="Liked books"
              value={userProfileData.likedBooks.length + ''}
              icon={<IconHeart />}
            />
          </Grid.Col>
        </Grid>
        <Title order={1} className={c.sectionTitles}>
          Library
        </Title>
        {userProfileData.ownedBooks.length === 0 && (
          <Flex justify="center" align="center" pt="lg" direction="column">
            <Text className={c.t1}>
              You don't have any books in your library yet.
            </Text>
            <Text className={c.t2}> Start building your own library </Text>
            <Text className={c.t3}> ... or go to the explore page!</Text>
            <Blockquote cite="- J. R. R. Tolkien">
              Little By Little, One Travels Far
            </Blockquote>
          </Flex>
        )}
        <ScrollArea pt="lg" className={c.flexLibrary}>
          <Flex gap="md">
            {userProfileData.ownedBooks.map((book) => (
              <UnstyledButton
                onClick={() => navigate(`/book/${book.id}`)}
                style={{ height: rem(300), width: rem(180), flexShrink: 0 }}
              >
                <BookDisplay book={book} />
              </UnstyledButton>
            ))}
          </Flex>
        </ScrollArea>
        {user?.id === userProfileData.id && (
          <Group pt="lg" w="100%" position="right">
            <Button
              onClick={() =>
                openContextModal({
                  modal: 'addBook',
                  title: 'Add a book to your library',
                  innerProps: {},
                })
              }
              leftIcon={<IconPlus />}
              variant="outline"
            >
              Add book
            </Button>
          </Group>
        )}
        {isCurrentUser && resData?.length !== 0 && (
          <>
            <Title order={1} className={c.sectionTitles}>
              Reservations
            </Title>
            <Text> The following books have reservation requests</Text>
            {resData?.map((r) => (
              <Flex className={c.bookSlim}>
                <Flex direction={'column'}>
                  <Text className={c.textBookTitle}>{r.book.title}</Text>
                  <Text className={c.textAuthor}>{r.book.author}</Text>
                </Flex>
                <Box sx={{ flexGrow: 1 }} />
                <Button
                  variant="outline"
                  leftIcon={<IconBook2 />}
                  onClick={() => navigate(`/book/${r.book.id}`)}
                >
                  View
                </Button>
              </Flex>
            ))}
          </>
        )}
      </Flex>
    </Container>
  );
};

export default ProfilePage;

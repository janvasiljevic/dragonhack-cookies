import { useUserControllerFindOne } from '@/api/user/user';
import BookDisplay from '@/components/BoookDisplay';
import { ProfileParams } from '@/router';
import { useAppStore } from '@/store';
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Group,
  Text,
  Timeline,
  Title,
  createStyles,
  rem,
} from '@mantine/core';
import {
  IconBook,
  IconGitBranch,
  IconGitCommit,
  IconGitPullRequest,
  IconMessageDots,
  IconPlus,
} from '@tabler/icons-react';
import { useParams } from 'react-router-dom';

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

  const { data: userProfileData, isLoading } = useUserControllerFindOne(
    userId || '',
    {
      query: {
        enabled: !!userId,
      },
    },
  );

  if (isLoading || !userProfileData) {
    return <div> Loading... </div>;
  }

  return (
    <Container size="md" w={'100%'}>
      <Flex direction="column">
        <Text className={c.username}> {userProfileData.email} </Text>
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
              title="Books owned"
              value={userProfileData.ownedBooks.length + ''}
              icon={<IconBook />}
            />
          </Grid.Col>
          <Grid.Col sm={4}>
            <StatBlock
              title="Books owned"
              value={userProfileData.ownedBooks.length + ''}
              icon={<IconBook />}
            />
          </Grid.Col>
        </Grid>
        <Title order={1} className={c.sectionTitles}>
          Library
        </Title>
        <Flex direction="row" gap={'lg'} pt="lg">
          {userProfileData.ownedBooks.map((book) => (
            <Box style={{ height: rem(300), width: rem(180) }}>
              <BookDisplay book={book} />
            </Box>
          ))}
        </Flex>
        {user?.id === userProfileData.id && (
          <Group pt="lg" w="100%" position="right">
            <Button leftIcon={<IconPlus />} variant="outline">
              Add book
            </Button>
          </Group>
        )}
      </Flex>
      <Timeline bulletSize={24} lineWidth={2}>
        <Timeline.Item bullet={<IconGitBranch size={12} />} title="New branch">
          <Text color="dimmed" size="sm">
            You&apos;ve created new branch{' '}
            <Text variant="link" component="span" inherit>
              fix-notifications
            </Text>{' '}
            from master
          </Text>
          <Text size="xs" mt={4}>
            2 hours ago
          </Text>
        </Timeline.Item>

        <Timeline.Item bullet={<IconGitCommit size={12} />} title="Commits">
          <Text color="dimmed" size="sm">
            You&apos;ve pushed 23 commits to
            <Text variant="link" component="span" inherit>
              fix-notifications branch
            </Text>
          </Text>
          <Text size="xs" mt={4}>
            52 minutes ago
          </Text>
        </Timeline.Item>
      </Timeline>
    </Container>
  );
};

export default ProfilePage;

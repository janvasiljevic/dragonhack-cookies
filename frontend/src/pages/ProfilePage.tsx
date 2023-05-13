import { ProfileParams } from '@/router';
import {
  Text,
  Container,
  Flex,
  Title,
  createStyles,
  rem,
  Divider,
} from '@mantine/core';
import { useParams } from 'react-router-dom';

const useStyles = createStyles((t) => ({
  username: {
    fontSize: rem(50),
  },
  sectionTitles: {
    marginTop: t.spacing.lg,
  },
}));

const ProfilePage = () => {
  const { userId } = useParams<ProfileParams>();
  const { classes: c } = useStyles();

  console.log(userId);

  return (
    <Container size="md" w={'100%'}>
      <Flex direction="column">
        <Text className={c.username}> Test </Text>
        <Divider />
        <Title order={1} className={c.sectionTitles}>
          Library
        </Title>
      </Flex>
    </Container>
  );
};

export default ProfilePage;

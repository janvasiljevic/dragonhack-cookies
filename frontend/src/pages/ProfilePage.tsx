import { ProfileParams } from '@/router';
import { Container, Flex, Title } from '@mantine/core';
import { useParams } from 'react-router-dom';

const ProfilePage = () => {
  const { userId } = useParams<ProfileParams>();

  console.log(userId);

  return (
    <Container size="xs">
      <Flex>
        <Title> Test </Title>
        <Title> Library </Title>
      </Flex>
    </Container>
  );
};

export default ProfilePage;

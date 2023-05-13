import { useUserControllerFindOne } from '@/api/user/user';
import { useAppStore } from '@/store';
import { Container, Stack } from '@mantine/core';

const FriendsPage = () => {
  const user = useAppStore((state) => state.user);

  const { data: userProfileData, isLoading } = useUserControllerFindOne(
    user?.id || '',
    {
      query: {
        enabled: !!user.id,
      },
    },
  );

  if (isLoading || !userProfileData) {
    return <div> Loading... </div>;
  }

  return (
    <Container>
      <Stack gap="md">
        {userProfileData.friendsTo.map((friend) => (
          <div>{friend.email}</div>
        ))}
      </Stack>
    </Container>
  );
};

export default FriendsPage;

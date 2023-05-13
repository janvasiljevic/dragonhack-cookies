import { useAppStore } from '@/store';
import { Flex } from '@mantine/core';
import { useOutlet } from 'react-router-dom';

const NavBarLayout = () => {
  const outlet = useOutlet();

  const user = useAppStore((s) => s.user);

  return (
    <Flex w="100%" h="100vh" direction="column" sx={{ overflow: 'hidden' }}>
      {user?.email}
      <Flex
        sx={{ flexGrow: 1, overflowX: 'hidden', overflowY: 'auto' }}
        h="100%"
        w="100%"
      >
        {outlet}
      </Flex>
    </Flex>
  );
};

export default NavBarLayout;

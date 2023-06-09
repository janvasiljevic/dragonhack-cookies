import { useAppStore } from '@/store';
import {
  Box,
  Burger,
  Button,
  Container,
  Drawer,
  Flex,
  Group,
  Menu,
  Stack,
  Tabs,
  Text,
  UnstyledButton,
  createStyles,
  rem,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconBook,
  IconChevronDown,
  IconLogout,
  IconSearch,
  IconTimeline,
  IconUser,
  IconUsersGroup,
} from '@tabler/icons-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles((t) => ({
  header: {
    paddingTop: t.spacing.sm,
    background: t.fn.primaryColor(),

    borderBottom: `${rem(1)} solid ${
      t.fn.variant({ variant: 'filled', color: t.primaryColor }).background
    }`,

    marginBottom: rem(20),
  },

  mainSection: {
    paddingBottom: t.spacing.sm,
  },

  user: {
    color: t.white,
    padding: `${t.spacing.xs} ${t.spacing.sm}`,
    borderRadius: t.radius.sm,
    transition: 'background-color 100ms ease',

    '&:hover': {
      backgroundColor: t.fn.lighten(t.fn.primaryColor(), 0.1),
    },

    [t.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  burger: {
    [t.fn.largerThan('xs')]: {
      display: 'none',
    },
  },

  userActive: {
    backgroundColor: t.fn.lighten(t.fn.primaryColor(), 0.1),
  },

  tabs: {
    [t.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  tabsList: {
    borderBottom: '0 !important',
  },

  tab: {
    fontWeight: 500,
    height: rem(38),
    color: t.white,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    display: 'flex',

    borderColor: t.fn.variant({
      variant: 'filled',
      color: t.primaryColor,
    }).background,

    '&:hover': {
      backgroundColor: t.fn.lighten(t.fn.primaryColor(), 0.1),
    },

    '&[data-active]': {
      backgroundColor: t.fn.lighten(t.fn.primaryColor(), 0.1),
      borderColor: t.fn.variant({
        variant: 'filled',
        color: t.primaryColor,
      }).background,
    },
  },
}));

type TabItem = {
  name: string;
  icon: React.ReactNode;
  onclick: () => void;
};

const MainNavbar = () => {
  const user = useAppStore((s) => s.user);
  const navigate = useNavigate();
  const clearUserData = useAppStore((state) => state.clearAllUserDatas);

  const { classes, theme, cx } = useStyles();
  const [opened, { toggle, close }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const tabs: TabItem[] = [
    // {
    //   name: 'Timeline',
    //   icon: <IconTimeline size={20} />,
    //   onclick: () => navigate('/timeline'),
    // },
    {
      name: 'Explore',
      icon: <IconSearch size={20} />,
      onclick: () => navigate('/explore'),
    },
    {
      name: 'Profile',
      icon: <IconUser size={20} />,
      onclick: () => navigate(`/profile/${user?.id}`),
    },
    // {
    //   name: 'Friends',
    //   icon: <IconUsersGroup size={20} />,
    //   onclick: () => navigate('/friends'),
    // },
  ];

  const logout = () => {
    clearUserData();
    navigate('/');
  };

  const items = tabs.map((tab) => (
    <Tabs.Tab
      icon={tab.icon}
      value={tab.name}
      key={tab.name}
      onClick={() => tab.onclick()}
    >
      <Box> {tab.name} </Box>
    </Tabs.Tab>
  ));

  const drawerItems = tabs.map((tab) => (
    <Button
      key={tab.name}
      leftIcon={tab.icon}
      w="100%"
      variant="subtle"
      size="xl"
    >
      {tab.name}
    </Button>
  ));

  return (
    <>
      <Drawer opened={opened} onClose={close}>
        <Drawer.Body
          style={{ overflow: 'hidden', flexGrow: 1, height: '100%' }}
        >
          <Flex direction="column" h="100%">
            <Stack>{drawerItems}</Stack>
            <Box style={{ height: rem(100) }} />
            <Button
              leftIcon={<IconLogout size={20} />}
              w="100%"
              variant="subtle"
              size="xl"
              onClick={logout}
              color="red"
            >
              Logout
            </Button>
          </Flex>
        </Drawer.Body>
      </Drawer>
      <div className={classes.header}>
        <Container className={classes.mainSection}>
          <Group position="apart">
            <Flex align="center">
              <IconBook size={30} color={theme.white} />
              <Text ml="lg" color="white">
                ShelfShare
              </Text>
            </Flex>

            <Burger
              opened={opened}
              onClick={toggle}
              className={classes.burger}
              size="sm"
              color={theme.white}
            />

            <Menu
              width={260}
              position="bottom-end"
              transitionProps={{ transition: 'pop-top-right' }}
              onClose={() => setUserMenuOpened(false)}
              onOpen={() => setUserMenuOpened(true)}
              withinPortal
            >
              <Menu.Target>
                <UnstyledButton
                  className={cx(classes.user, {
                    [classes.userActive]: userMenuOpened,
                  })}
                >
                  <Group spacing={7}>
                    <Text
                      weight={500}
                      size="sm"
                      sx={{ lineHeight: 1, color: theme.white }}
                      mr={3}
                    >
                      {user?.email}
                    </Text>
                    <IconChevronDown size={rem(12)} stroke={1.5} />
                  </Group>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  icon={<IconLogout size="0.9rem" stroke={1.5} />}
                  onClick={() => logout()}
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Container>
        <Container>
          <Tabs
            defaultValue="Home"
            variant="outline"
            classNames={{
              root: classes.tabs,
              tabsList: classes.tabsList,
              tab: classes.tab,
            }}
          >
            <Tabs.List>{items}</Tabs.List>
          </Tabs>
        </Container>
      </div>{' '}
    </>
  );
};

export default MainNavbar;

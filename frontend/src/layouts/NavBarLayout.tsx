import { Flex } from "@mantine/core";
import { useOutlet } from "react-router-dom";

const NavBarLayout = () => {
  const outlet = useOutlet();

  return (
    <Flex w="100%" h="100vh" direction="column" sx={{ overflow: "hidden" }}>
      TODO
      <Flex
        sx={{ flexGrow: 1, overflowX: "hidden", overflowY: "auto" }}
        h="100%"
        w="100%"
      >
        {outlet}
      </Flex>
    </Flex>
  );
};

export default NavBarLayout;

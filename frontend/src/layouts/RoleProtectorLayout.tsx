import { AuthResponseRole } from "@/api/model";
import { useUserStore } from "@/store";
import { Container } from "@mantine/core";
import React from "react";
import { useOutlet } from "react-router-dom";

type Props = {
  roles: AuthResponseRole[];
};

const RoleProtectorLayout = ({ roles }: Props) => {
  const outlet = useOutlet();

  const user = useUserStore((state) => state);

  if (!user.role) return <></>;

  if (!roles.includes(user.role))
    return <Container> You dont have permission to acces this view </Container>;

  return outlet;
};

export default RoleProtectorLayout;

import React from 'react';
import { Avatar, Button, Icon, Tooltip } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { toast } from "react-toastify";
import { AiOutlineLogout, AiFillHome, AiFillFolderOpen } from 'react-icons/ai';

import { SidebarComponent } from "./styles";

export const Sidebar = () => {
  const router = useRouter();

  async function logout(): Promise<void> {
    await signOut({ redirect: false });
    toast.info("Aguarde alguns instantes.", { icon: "🌙" });
    router.push("/");
  }

  return (
    <SidebarComponent>
      {/* <Avatar
        position="absolute"
        top="2rem"
        size="lg"
        src="/icon.png"
      /> */}

      <Link href="/Dashboard">
        <a className="route">
          <AiFillHome />
        </a>
      </Link>

      <Link href="/Lists">
        <a className="route">
          <AiFillFolderOpen />
        </a>
      </Link>

      <Tooltip label="Sair" bg="purple.500" placement="right">
        <Button
          position="absolute"
          bottom="2rem"
          bg="transparent"
          color="gray.200"
          _hover={{
            color: 'purple.400',
          }}

          onClick={logout}
        >
          <Icon fontSize="3xl" as={AiOutlineLogout} />
        </Button>
      </Tooltip>
    </SidebarComponent>
  );
}
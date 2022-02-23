import { useState } from "react";
import { signIn } from 'next-auth/react';
import Head from "next/head";
import { toast } from "react-toastify";
import { Heading, VStack, Stack, Text, Button, Avatar } from "@chakra-ui/react";
import { AiFillGithub } from 'react-icons/ai';

import { Login as LoginStyled } from "./styles";

export function Login() {
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);

  function login(): void {
    setIsLoadingLogin(true);
    signIn('github');
    toast.info("Login feito com sucesso!", { icon: "🌙" });
    setIsLoadingLogin(false);
    return;
  }

  return (
    <>
      <Head><title>Login | MyMoon</title></Head>

      <LoginStyled>
        <div className="container_full_gray">
          <Stack
            w="25rem"
            direction="column"
            align="center"
            justify="center"
            spacing="10"
            boxShadow="dark-lg"

            px="8"
            pt="12"
            pb="6"
            bg="gray.900"
            borderRadius="lg"
          >
            <VStack>
              <Avatar
                position="absolute"
                top="2rem"
                size="lg"
                src="/icon.png"
              />
              <Heading color="purple.600" fontSize="7xl">MyMoon</Heading>
              <Text color="purple.300" fontSize="md" opacity="0.6">
                Faça Login na plataforma para continuar
              </Text>
            </VStack>

            <Button
              w="100%"
              h="2.9rem"
              gap="2"

              bg="gray.900"
              borderRadius="0.26rem"
              borderWidth="0.12rem"
              borderColor="purple.600"

              color="purple.600"
              fontSize="lg"
              fontWeight="bold"

              transition="0.2s"

              _hover={{
                color: 'gray.900',
                bg: 'purple.600'
              }}

              isLoading={isLoadingLogin}
              onClick={login}
            >
              <AiFillGithub size={23} /> Login com Github
            </Button>
          </Stack>
        </div>
      </LoginStyled>
    </>
  );
}
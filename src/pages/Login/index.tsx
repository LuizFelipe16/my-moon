import { useState } from "react";
import { signIn } from 'next-auth/react';
import Link from "next/link";
import Head from "next/head";
import { toast } from "react-toastify";
import { Heading, VStack, Stack, Text, Button, Avatar, Icon } from "@chakra-ui/react";
import { AiFillGithub } from 'react-icons/ai';
import { FaArrowLeft } from 'react-icons/fa';

import { Login as LoginStyled } from "../../styles/pages/login";

export default function Login() {
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);

  function login(): void {
    setIsLoadingLogin(true);
    signIn('github');
    toast.info("Aguarde alguns instantes.", { icon: "🌙" });
    setIsLoadingLogin(false);
    return;
  }

  return (
    <>
      <Head><title>Login | MyMoon</title></Head>

      <LoginStyled>
        <div className="container">
          <Stack
            w="55%"
            h="100%"

            direction="column"
            align="center"
            justify="center"
            spacing="10"

            px="8"
            pt="12"
            pb="6"
            bg="gray.900"
          >
            <VStack>
              <Avatar
                position="absolute"
                top="4rem"
                size="lg"
                src="/icon.png"
              />
              <Heading color="purple.600" fontSize="8xl">MyMoon</Heading>
              <Text color="purple.300" fontSize="xl" opacity="0.6">
                Faça Login na plataforma para continuar
              </Text>
            </VStack>

            <Button
              w="24rem"
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

      <Link href="/" passHref>
        <Button
          position="fixed"
          size="lg"
          top="10"
          left="10"
          boxShadow="dark-lg"
          borderRadius="full"
          colorScheme="purple"
        >
          <Icon as={FaArrowLeft} />
        </Button>
      </Link>
    </>
  );
}
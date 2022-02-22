import Head from "next/head";
import { Heading, VStack, Stack, Text } from "@chakra-ui/react";
import { AiFillGithub } from 'react-icons/ai';
import { signIn } from 'next-auth/react';

import { Login as LoginStyled } from "./styles";

export function Login() {
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
              <Heading color="purple.600" fontSize="6xl">MyMoon</Heading>
              <Text color="purple.300" fontSize="lg" opacity="0.6">
                Faça Login na plataforma para continuar
              </Text>
            </VStack>

            <button
              type="button"
              onClick={() => signIn('github')}
            >
              <AiFillGithub size={23} /> Login com Github
            </button>
          </Stack>
        </div>
      </LoginStyled>
    </>
  );
}
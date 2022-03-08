import { Stack, Heading, Text, Button, Icon, HStack } from "@chakra-ui/react";
import Head from "next/head";
import { FaArrowRight, FaArrowUp } from 'react-icons/fa';
import { Footer } from "../components/layout/Footer";
import { ScrollTopButton } from "../components/layout/ScrollTopButton";

import { Home as HomeStyled } from '../styles/pages/home';

export default function Home() {
  return (
    <>
      <Head><title>Home | MyMoon</title></Head>
      <HomeStyled>
        <HStack spacing="12" pl="20" w="100vw" h="13vh" position="absolute" top="0">
          <a className="nav_link">🌙 MyMoon</a>
          <a className="nav_link">Home</a>
          <a className="nav_link">Nosso Blog</a>
          <a className="nav_link">Plataforma</a>
        </HStack>
        <div className="container_full_gray">
          <Stack spacing="5" direction="column" w="50%" justify="center" align="flex-start" pl="20">
            <Heading mt="12" textShadow="dark-lg" fontSize="5xl" fontWeight="extrabold">
              O Melhor Momento do
              <br />
              Dia, é com a iluminada
              <br />
              Lua!
            </Heading>
            <Text fontSize="2xl" fontWeight="300">
              Experimente uma outra forma de
              <br />
              ver suas atividades
            </Text>
            <Button size="lg" p="7" colorScheme="purple" boxShadow="lg" borderRadius="full">
              Conhecer MyMoon
              <Button
                ml="4"
                background="purple.600"
                color="purple.200"
                _hover={{ color: 'purple.400', background: 'gray.50' }}
              >
                <Icon as={FaArrowRight} />
              </Button>
            </Button>
          </Stack>
        </div>
        <ScrollTopButton />
      </HomeStyled>
      <Footer />
    </>
  );
}
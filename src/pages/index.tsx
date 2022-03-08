import { Stack, Heading, Text, Button, Icon, HStack, Flex, VStack } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { FaArrowRight } from 'react-icons/fa';
import { HomeCard } from "../components/HomeCard";

import { Footer } from "../components/layout/Footer";
import { Navigation } from "../components/layout/Navigation";
import { ScrollTopButton } from "../components/layout/ScrollTopButton";

import { Home as HomeStyled } from '../styles/pages/home';

export default function Home() {
  return (
    <>
      <Head><title>Home | MyMoon</title></Head>
      <Navigation />
      <HomeStyled>
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
            <Link href="/Login" passHref>
              <Button size="lg" p="7" colorScheme="purple" boxShadow="lg" borderRadius="full">
                Conhecer MyMoon
                <Button
                  ml="4"
                  bg="purple.600"
                  color="purple.200"
                  _hover={{ color: 'purple.400', bg: 'gray.50' }}
                >
                  <Icon as={FaArrowRight} />
                </Button>
              </Button>
            </Link>
          </Stack>
        </div>
        <ScrollTopButton />
      </HomeStyled>
      <HStack
        w="100vw"
        h="100vh"
        background="gray.300"
        spacing="20"
        align="center" justify="center"
      >
        <VStack spacing="16">
          <HomeCard
            src="/icons/clock.png"
            title="Seu tempo"
            text="Uma noite boa, é uma noite das melhores atividades que gosta."
          />
          <HomeCard
            src="/icons/popcorn.png"
            title="Pega a pipoca"
            text="Com a lua é o melhor momento para ver as suas séries e filmes preferidos."
          />
        </VStack>
        <VStack spacing="16">
          <HomeCard
            src="/icons/list.png"
            title="Listas!"
            text="Faça listas dos episódios preferidos, dos já assistidos, das séries ou vários outros."
          />
          <HomeCard
            src="/icons/moon.png"
            title="Sua Noite"
            text="Ninguém vai poder interromper."
          />
        </VStack>
      </HStack>
      <Footer />
    </>
  );
}
import { Flex, Spinner } from "@chakra-ui/react";
import Head from "next/head";

export const Loader = () => {
  return (
    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
    >
      <Head><title>Carregando | MyMoon</title></Head>
      <Spinner color="purple.600" size="xl" />
    </Flex>
  );
}
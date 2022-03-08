import { Heading, HStack, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";

function Footer() {
  return (
    <HStack
      w="100vw"
      h="55vh"
      background="gray.900"
      spacing="4"
      p="16"
    >
      <VStack
        w="25%"
        h="100%"
        align="flex-start"
        justify="center"
        spacing="6"
        pl="4"
        borderColor="purple.400"
        borderRightWidth="2px"
      >
        <Heading fontSize="2xl">Visite</Heading>
        <Link href="/" passHref><Text fontSize="lg" fontWeight="200">Home</Text></Link>
        <Link href="/Blog" passHref><Text fontSize="lg" fontWeight="200">Blog</Text></Link>
        <Link href="/Login" passHref><Text fontSize="lg" fontWeight="200">Plataforma</Text></Link>
      </VStack>
      <VStack
        w="30%"
        h="100%"
        align="flex-start"
        justify="center"
        spacing="6"
        pl="6"
        borderColor="purple.400"
        borderRightWidth="2px"
      >
        <Heading fontSize="2xl">Entre em Contato</Heading>
        <Text fontSize="lg" fontWeight="200">felipefelizatti215@gmail.com</Text>
        <Text fontSize="lg" fontWeight="200">(19) 98952 2121</Text>
        <Text fontSize="lg" fontWeight="200">git: LuizFelipe16</Text>
      </VStack>
    </HStack>
  );
}

export { Footer };
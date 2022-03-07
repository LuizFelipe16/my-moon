import { Flex, Heading, Button, useDisclosure, VStack, HStack } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import Head from 'next/head';

import { useItems } from '../../hooks/useItems';

import { Loader } from '../../components/Loader';
import { ModalAddListItem } from '../../components/Modal/AddListItem';
import { Sidebar } from '../../components/Sidebar';
import { ItemList } from '../../components/ItemList';

import { Container } from "../../styles/pages/lists";

export default function Lists() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session } = useSession();

  const { data, isLoading, error, isFetching } = useItems(1);

  if (!session || !!isLoading) return <Loader />

  return (
    <>
      <Head><title>Listas | MyMoon</title></Head>
      <Container>
        <Sidebar />

        <Flex
          flex="1"
          h="100vh"
          p="10"
          flexDirection="column"
        >
          <Heading fontSize="5xl" color="purple.400">MyMoon</Heading>
          <Button
            onClick={onOpen}
            position="absolute"
            top="4rem"
            right="3rem"
            colorScheme="purple"
          >
            Adicionar a Lista
          </Button>

          <HStack
            w="100%"
            h="auto"
            mt="6"
            gap={2}
            flexWrap="wrap"
            overflowX="scroll"
          >
            {data?.items.map(item => (<ItemList key={item.id} item={item} />))}
          </HStack>
        </Flex>
      </Container>

      <ModalAddListItem
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}
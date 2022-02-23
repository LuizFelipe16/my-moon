import { useEffect, useState, useCallback } from 'react';
import { Flex, Heading, Button, useDisclosure, useToast, VStack, Input, HStack } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';

import { Loader } from '../../components/Loader';
import { ModalAddListItem } from '../../components/Modal/AddListItem';
import { Sidebar } from '../../components/Sidebar';

import { api } from '../../services/api';

import { Container } from "./styles";

interface IListItem {
  email: string;
  name: string;
  description: string;
  status?: string;
  // type?: string;
  // created_at?: string;
  ts: number;
  id: string;
}

export default function Lists() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session } = useSession();

  const toast = useToast();

  const [isLoadingCreateListItem, setIsLoadingCreateListItem] = useState(false);
  const [isLoadingList, setIsLoadingList] = useState(false);

  const [lists, setLists] = useState<IListItem[]>([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const createNewItemList = useCallback(async () => {
    setIsLoadingCreateListItem(true);
    await api.post("/lists", {
      name,
      description
    }).then((response) => {
      toast({
        title: response.data.message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setIsLoadingCreateListItem(false);

      loadingLists();
    }).catch((response) => {
      toast({
        title: "Ocorreu um erro inesperado",
        status: "error",
        duration: 5000,
        isClosable: true
      });
      setIsLoadingCreateListItem(false);
    });
  }, [name, description]);

  async function loadingLists(): Promise<void> {
    setIsLoadingList(true);

    await api.get("/lists").then((response) => {
      setLists(response.data.data);
      setIsLoadingList(false);
    }).catch((response) => {
      setIsLoadingList(false);
      toast({
        title: response.error,
        status: "error",
        duration: 5000,
        isClosable: true
      });
    });
  }

  useEffect(() => {
    setIsLoadingList(true);
    loadingLists();
  }, [session]);

  if (!session || !!isLoadingList) {
    return <Loader />
  }

  return (
    <>
      <Head><title>Dashboard | MyMoon</title></Head>
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
            flexWrap="wrap"
            overflowX="scroll"
          >
            {lists?.map(item => (
              <div key={item.id} className={`list_item`}>
                <div className={`list_item_image`}>
                  <img src="/capa.jpg" alt={`Capa ${item.name}`} />
                </div>

                <div>
                  <h1>{item.name}</h1>
                  <p>{item.description}</p>
                </div>

                <Link href={`/ViewItemList/${item.id}`} passHref>
                  <button type="button">
                    Ver
                  </button>
                </Link>
              </div>
            ))}
          </HStack>


        </Flex>
      </Container>

      <ModalAddListItem
        isLoading={isLoadingCreateListItem}
        isOpen={isOpen}
        onClose={onClose}
        onClick={createNewItemList}
      >
        <VStack spacing="4">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant='filled'
            placeholder='Título'
            p="6"
            bg="gray.700"
            focusBorderColor="purple.500"
            _hover={{
              bg: 'gray.700'
            }}
          />
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant='filled'
            placeholder='Descrição'
            p="6"
            bg="gray.700"
            focusBorderColor="purple.500"
            _hover={{
              bg: 'gray.700'
            }}
          />
        </VStack>
      </ModalAddListItem>
    </>
  );
}
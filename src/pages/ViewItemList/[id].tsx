import { useEffect, useState } from 'react';
import { Flex, Heading, Button, HStack, useToast, Text, VStack, Image, Icon, useDisclosure } from '@chakra-ui/react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FaArrowLeft, FaPlus, FaTrash } from 'react-icons/fa';

import { Loader } from '../../components/Loader';
import { Sidebar } from '../../components/Sidebar';

import { api } from '../../services/api';

import { Container } from "./styles";
import Link from 'next/link';
import { queryClient } from '../../services/queryClient';
import { useMutation } from 'react-query';
import { ModalWarningDeleteListItem } from '../../components/Modal/WarningDeleteListItem';
import { useCallback } from 'react';
import { ModalAddContentItem } from '../../components/Modal/AddContentItem';
import { useContents } from '../../hooks/useContents';
import { ContentItem } from '../../components/ContentItem';

interface IItem {
  name: string;
  description: string;
  url: string;
  status: string;
  id: string;
  created_at?: string;
  seasons?: number;
}

interface IViewItemListProps {
  item: IItem;
}

export default function ViewItemList({ item }: IViewItemListProps) {
  const router = useRouter();
  const [itemId, setItemId] = useState(String(router?.query?.id));

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { data: session } = useSession();
  const { data, isLoading } = useContents(1, itemId);

  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const modalAddOnOpenOrClose = () => setIsModalAddOpen(!isModalAddOpen);

  const [isLoadingWaitingDeleteItem, setIsLoadingWaitingDeleteItem] = useState(false);
  const [isLoadingWaitingUpdateStatusItem, setIsLoadingWaitingUpdateStatusItem] = useState(false);

  const deleteItemQuery = useMutation(async () => {
    await api.delete(`/itemList/${itemId}`).then((response) => {
      setIsLoadingWaitingDeleteItem(false);
      router.push('/Lists');
      toast({ title: response.data.message, status: "success", duration: 5000 });
    });
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('items')
    },
    onError: () => {
      toast({ title: "Ocorreu um erro", status: "error", duration: 5000 });
      setIsLoadingWaitingDeleteItem(false);
    }
  });

  const handleDeleteItem = useCallback(async () => {
    setIsLoadingWaitingDeleteItem(true);
    await deleteItemQuery.mutateAsync();
  }, []);

  async function updateStatusItem(): Promise<void> {
    setIsLoadingWaitingUpdateStatusItem(true);

    await api.put(`/itemList/${itemId}`, {
      status: !item.status
    }).then((response) => {
      setIsLoadingWaitingUpdateStatusItem(false);
      router.push('/Lists');
      toast({ title: response.data.message, status: "success", duration: 5000 });
    }).catch((response) => {
      toast({ title: response.data.error, status: "error", duration: 5000 });
      setIsLoadingWaitingUpdateStatusItem(false);
    });
  }

  useEffect(() => {
    setItemId(String(router?.query?.id));
  }, [router?.query?.id])

  if (!session || !item || !!isLoading) return <Loader />

  return (
    <>
      <Head><title>{item.name} | MyMoon</title></Head>
      <Container>
        <Sidebar />

        <Flex
          flex="1"
          h="100vh"
          p="10"
          flexDirection="column"
        >
          <HStack
            spacing="4"
          >
            <Link href="/Lists" passHref>
              <Text
                cursor="pointer"
                fontSize="lg"
                transition="0.2s"
                color="purple.400"
                _hover={{
                  color: "gray.700",
                }}
              >
                <FaArrowLeft />
              </Text>
            </Link>
            <Heading fontSize="5xl" color="purple.400">{item.name}</Heading>
          </HStack>

          <HStack
            spacing="4"
            position="absolute"
            top="4rem"
            right="3rem"
          >
            <Button
              onClick={() => onOpen()}
              colorScheme="purple"
            >
              <Icon as={FaTrash} />
            </Button>
            <Button
              onClick={modalAddOnOpenOrClose}
              colorScheme="purple"
            >
              <Icon as={FaPlus} />
            </Button>
          </HStack>

          <HStack
            w="100%"
            h="100%"
            mt="8"
          >
            <VStack
              w="17rem"
              h="100%"
              p="5"
              borderRadius="lg"
              bgColor="gray.700"
            >
              <Image
                src={item.url}
                w="100%"
                h="19rem"
                borderRadius="lg"
                objectFit="cover"
              />
              <Text
                w="100%"
                p="2"
                align="center"
                borderRadius="lg"
                bgColor="purple.500"
              >
                {item.description}
              </Text>
              <Text
                w="100%"
                p="2"
                align="center"
                borderRadius="lg"
                bgColor="purple.500"
              >
                Temporadas {item.seasons}
              </Text>
              <Button
                w="100%"
                isLoading={isLoadingWaitingUpdateStatusItem}
                onClick={updateStatusItem}
                colorScheme={!!item.status ? 'green' : 'red'}
              >
                {!!item.status ? 'Completado' : 'Não Completado'}
              </Button>
            </VStack>

            <VStack
              flex={1}
              h="100%"
              mt="6"
              borderColor="purple.400"
              borderTopWidth="thin"
              overflowX="hidden"
              overflowY="scroll"
              align="center"
              justify="flex-start"
            >
              {data?.contents.map(content => <ContentItem content={content} />)}
            </VStack>
          </HStack>
        </Flex>
      </Container>

      <ModalAddContentItem
        id={itemId}
        isOpen={isModalAddOpen}
        onClose={modalAddOnOpenOrClose}
      />

      <ModalWarningDeleteListItem
        isOpen={isOpen}
        onClose={onClose}
        isLoading={isLoadingWaitingDeleteItem}
        onDeleteItem={handleDeleteItem}
      />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string;

  const response = await fetch(`http://localhost:3000/api/itemList/${id}`);
  const data = await response.json();

  const item: IItem = data.item.data;

  return {
    props: {
      item
    }
  }
};
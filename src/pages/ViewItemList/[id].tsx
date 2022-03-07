import { useEffect, useState, useCallback } from 'react';
import { Flex, Heading, Button, HStack, useToast, Text, VStack, Image, Icon, useDisclosure } from '@chakra-ui/react';
import { useMutation } from 'react-query';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaArrowLeft, FaPlus, FaTrash } from 'react-icons/fa';
import axios from 'axios';

import { Loader } from '../../components/Loader';
import { Sidebar } from '../../components/Sidebar';
import { ContentItem } from '../../components/ContentItem';
import { ModalWarningDelete } from '../../components/Modal/WarningDelete';
import { ModalAddContentItem } from '../../components/Modal/AddContentItem';

import { useContents } from '../../hooks/useContents';
import { api } from '../../services/api';
import { queryClient } from '../../services/queryClient';

import { Container } from "../../styles/pages/viewItemList";

interface IItem {
  name: string;
  description: string;
  url: string;
  status: string;
  id: string;
  created_at?: string;
  seasons: number;
  seasons_formatted: Array<number>;
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
              h="31rem"
              mt="6"
              pr="4"
              borderColor="purple.500"
              borderTopWidth="thin"
              align="center"
              justify="flex-start"
              overflowX="scroll"
            >
              <br />
              {item.seasons_formatted.map(s => {
                return (
                  <>
                    <Text alignSelf="flex-start" color="gray.600">{s}º Temporada </Text>
                    {data?.contents.map(content => {
                      if (content.season === s) {
                        return (
                          <ContentItem list_id={itemId} content={content} />
                        )
                      }
                    })}
                    <br />
                  </>
                )
              })}
            </VStack>
          </HStack>
        </Flex>
      </Container>

      <ModalAddContentItem
        id={itemId}
        isOpen={isModalAddOpen}
        onClose={modalAddOnOpenOrClose}
        seasons={item.seasons_formatted}
      />

      <ModalWarningDelete
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

  const response = await axios.get(`http://localhost:3000/api/itemList/${id}`);
  const data = await response.data;

  const item: IItem = data.item.data;

  const seasons_formatted = [];

  for (let i = 1; i <= item.seasons; i++) {
    seasons_formatted.push(i);
  }

  const formatted = {
    name: item.name,
    description: item.description,
    url: item.url,
    status: item.status,
    seasons: item.seasons,
    seasons_formatted: seasons_formatted
  }

  return {
    props: {
      item: formatted
    }
  }
};
import { useEffect, useState } from 'react';
import { Flex, Heading, Button, HStack, useToast, Text } from '@chakra-ui/react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FaArrowLeft, FaTrash } from 'react-icons/fa';

import { Loader } from '../../components/Loader';
import { Sidebar } from '../../components/Sidebar';

import { api } from '../../services/api';

import { Container } from "./styles";
import Link from 'next/link';
import { queryClient } from '../../services/queryClient';
import { useMutation } from 'react-query';

interface IItem {
  name: string;
  description: string;
  status: boolean;
  type?: string;
  created_at?: string;
}

interface IViewItemListProps {
  item: IItem;
}

export default function ViewItemList({ item }: IViewItemListProps) {
  const router = useRouter();
  const toast = useToast();
  const { data: session } = useSession();

  const [itemId, setItemId] = useState(router?.query?.id);
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

  const handleDeleteItem = async () => {
    setIsLoadingWaitingDeleteItem(true);
    await deleteItemQuery.mutateAsync();
  };

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
    setItemId(router?.query?.id);
  }, [router?.query?.id])

  if (!session || !item) return <Loader />

  return (
    <>
      <Head><title>{item.description} | MyMoon</title></Head>
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
              isLoading={isLoadingWaitingUpdateStatusItem}
              onClick={updateStatusItem}
              colorScheme={!!item.status ? 'green' : 'red'}
            >
              {!!item.status ? 'Completado' : 'Não Completado'}
            </Button>
            <Button
              isLoading={isLoadingWaitingDeleteItem}
              onClick={handleDeleteItem}
              colorScheme="purple"
            >
              <FaTrash />
            </Button>
          </HStack>

          <HStack
            w="100%"
            h="auto"
            mt="6"
            flexWrap="wrap"
            overflowX="scroll"
          >

          </HStack>
        </Flex>
      </Container>
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
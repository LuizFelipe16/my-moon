import { useEffect, useState } from 'react';
import { Flex, Heading, Button, HStack, useToast } from '@chakra-ui/react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { Loader } from '../../components/Loader';
import { Sidebar } from '../../components/Sidebar';

import { api } from '../../services/api';

import { Container } from "./styles";

interface IItem {
  name: string;
  description: string;
  status: string;
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

  const [itemId, setItemId] = useState(router?.query?.id)
  const [isLoadingWaitingDeleteItem, setIsLoadingWaitingDeleteItem] = useState(false);

  async function deleteItem(): Promise<void> {
    setIsLoadingWaitingDeleteItem(true);

    await api.delete(`/itemList/${itemId}`).then((response) => {
      setIsLoadingWaitingDeleteItem(false);
      router.push('/Lists');
      toast({
        title: response.data.message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }).catch((response) => {
      toast({
        title: response.data.error,
        status: "error",
        duration: 5000,
        isClosable: true
      });
      setIsLoadingWaitingDeleteItem(false);
    });
  }

  useEffect(() => {
    setItemId(router?.query?.id);
  }, [router?.query?.id])

  if (!session) {
    return <Loader />
  }

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
          <Heading fontSize="5xl" color="purple.400">{item.name}</Heading>

          <Button
            isLoading={isLoadingWaitingDeleteItem}
            onClick={deleteItem}
            position="absolute"
            top="4rem"
            right="3rem"
            colorScheme="purple"
          >
            Deletar
          </Button>

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
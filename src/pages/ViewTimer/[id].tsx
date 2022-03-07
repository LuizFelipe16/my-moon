import { useCallback, useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import axios from "axios";
import { useMutation } from "react-query";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Flex, Button, HStack, useToast, Icon, useDisclosure, Heading } from '@chakra-ui/react';
import { FaPlus, FaTrash } from 'react-icons/fa';

import { Loader } from "../../components/Loader";
import { Sidebar } from "../../components/Sidebar";
import { HeaderView } from "../../components/layout/HeaderView";
import { ModalWarningDelete } from "../../components/Modal/WarningDelete";
import { ModalAddClock } from "../../components/Modal/AddClock";
import { ClockComponent } from "../../components/Clock";

import { useClocks } from "../../hooks/useClocks";
import { queryClient } from "../../services/queryClient";
import { api } from "../../services/api";

import { Container } from "./styles";

type Timer = {
  id: string;
  name: string;
  description: string;
  created_at: string;
}

interface IViewTimerProps {
  timer: Timer;
}

export default function ViewTimer({ timer }: IViewTimerProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, isLoading } = useClocks(1, timer.id);

  const [isModalClockOpen, setIsModalClockOpen] = useState(false);
  const onCloseOrOpenModalClock = () => setIsModalClockOpen(!isModalClockOpen);

  const [isLoadingWaitingDeleteTimer, setIsLoadingWaitingDeleteTimer] = useState(false);

  const deleteTimerQuery = useMutation(async () => {
    await api.delete(`/timers/timer/${timer.id}`).then((response) => {
      toast({ title: response.data.message, status: "success", duration: 5000 });
    });
  }, {
    onSuccess: () => {
      router.push('/Timers');
      queryClient.invalidateQueries('timers');
    },
    onError: () => { toast({ title: "Ocorreu um erro;", status: "error", duration: 5000 }) }
  });

  const handleDeleteTimer = useCallback(async () => {
    setIsLoadingWaitingDeleteTimer(true);
    await deleteTimerQuery.mutateAsync();
    setIsLoadingWaitingDeleteTimer(false);
  }, []);

  if (!session || !timer || !!isLoading) return <Loader />

  return (
    <>
      <Head><title>{timer.name} | MyMoon</title></Head>
      <Container>
        <Sidebar />

        <Flex
          flex="1"
          h="100vh"
          p="10"
          flexDirection="column"
        >
          <HeaderView title={timer.name} href="/Timers" />

          <HStack
            spacing="4"
            position="absolute"
            top="4rem"
            right="3rem"
          >
            <Button onClick={onOpen} colorScheme="purple"><Icon as={FaTrash} /></Button>
            <Button onClick={onCloseOrOpenModalClock} colorScheme="purple"><Icon as={FaPlus} /></Button>
          </HStack>

          <Heading
            ml="9"
            mt="2"
            fontSize="lg"
            fontWeight="300"
            color="gray.500"
          >
            {timer.description}
          </Heading>

          <HStack
            w="100%"
            h="100%"
            mt="8"
            align="flex-start"
            flexWrap="wrap"
          >
            {data?.clocks.map(clock => <ClockComponent timer_id={timer.id} key={clock.id} clock={clock} />)}
          </HStack>
        </Flex>
      </Container>

      <ModalWarningDelete
        isLoading={isLoadingWaitingDeleteTimer}
        isOpen={isOpen}
        onClose={onClose}
        onDeleteItem={handleDeleteTimer}
      />

      <ModalAddClock
        id={timer.id}
        isOpen={isModalClockOpen}
        onClose={onCloseOrOpenModalClock}
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

  const response = await axios.get(`${process.env.APP_URL}/api/timers/timer/${id}`, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.data;

  const timer: Timer = data.item

  return {
    props: {
      timer
    }
  }
}
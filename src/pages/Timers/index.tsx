import { Flex, Heading, Button, useDisclosure, HStack } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import Head from 'next/head';

import { Loader } from '../../components/Loader';
import { Sidebar } from '../../components/Sidebar';

import { Container } from "../../styles/pages/timers";
import { ModalAddTimer } from '../../components/Modal/AddTimer';
import { useTimers } from '../../hooks/useTimers';
import { TimerItemComponent } from '../../components/TimerItem';

export default function Timers() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session } = useSession();
  const { data, isLoading } = useTimers(1);

  if (!session || !!isLoading) return <Loader />

  return (
    <>
      <Head><title>Timers | MyMoon</title></Head>
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
            Adicionar Timer
          </Button>

          <HStack
            w="100%"
            h="auto"
            mt="6"
            gap={2}
            flexWrap="wrap"
            overflowX="scroll"
          >
            {data?.timers.map(time => <TimerItemComponent key={time.id} timer={time} />)}
          </HStack>
        </Flex>
      </Container>

      <ModalAddTimer
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}
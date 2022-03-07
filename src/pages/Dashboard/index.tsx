import { Flex, Heading, Text, SimpleGrid, Box, HStack, Icon } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { GiDisc } from 'react-icons/gi';
import { GiSandsOfTime } from 'react-icons/gi';

import { Loader } from '../../components/Loader';
import { Sidebar } from '../../components/Sidebar';

import { optionsChart } from '../../configs/Charts';

import { useItems } from '../../hooks/useItems';
import { useTimers } from '../../hooks/useTimers';

import { Container } from "../../styles/pages/dashboard";

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

export default function Dashboard() {
  const { data: session } = useSession();

  const { data, isLoading } = useItems(1);
  const { data: dataTime, isLoading: isLoadingTimers } = useTimers(1);

  const totalCountCompleted = data?.totalCountCompleted;
  const totalCountNotCompleted = data?.totalCountNotCompleted;
  const series1 = [
    { name: 'data1', data: [Number(totalCountCompleted), Number(totalCountNotCompleted)] }
  ];

  if (!session || !!isLoading || !!isLoadingTimers) return <Loader />

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
          <Text fontSize="lg" color="gray.500" mt="4">| {session?.user.name}</Text>

          <SimpleGrid mt="6" w="100%" h="auto" gap="4" minChildWidth="320px">
            <Box
              p={["5", "8"]}
              bg="gray.800"
              borderRadius={8}
              transition=".2s"
              _hover={{
                boxShadow: 'lg'
              }}
            >
              <Text color="purple.500" fontSize="lg" mb="4">Sessões da Semana</Text>
              <Chart options={optionsChart} series={series1} type="area" height={160} />
            </Box>
            <Box
              p={["5", "8"]}
              bg="gray.800"
              borderRadius={8}
              transition=".2s"
              _hover={{
                boxShadow: 'lg'
              }}
            >
              <Text color="purple.500" fontSize="lg" mb="4">Listas Criadas</Text>
              <HStack fontFamily="Roboto" flex="1" align="center" justify="space-between">
                <Text color="purple.500" fontSize="8xl" fontWeight="bold">
                  {data?.totalCount}
                </Text>
                <Icon color="purple.500" fontSize="9xl" as={GiDisc} />
              </HStack>
            </Box>
            <Box
              p={["5", "8"]}
              bg="gray.800"
              borderRadius={8}
              transition=".2s"
              _hover={{
                boxShadow: 'lg'
              }}
            >
              <Text color="purple.500" fontSize="lg" mb="4">Timers Criados</Text>
              <HStack fontFamily="Roboto" flex="1" align="center" justify="space-between">
                <Text color="purple.500" fontSize="8xl" fontWeight="bold">
                  {dataTime?.totalCount}
                </Text>
                <Icon color="purple.500" fontSize="9xl" as={GiSandsOfTime} />
              </HStack>
            </Box>
          </SimpleGrid>
        </Flex>
      </Container>
    </>
  );
}
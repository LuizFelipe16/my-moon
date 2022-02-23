import { Flex, Heading, Text, SimpleGrid, Box } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';
import Head from 'next/head';

import { Loader } from '../../components/Loader';
import { Sidebar } from '../../components/Sidebar';

import { optionsChart } from '../../configs/Charts';

import { Container } from "./styles";

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const series1 = [
  { name: 'data1', data: [4, 1] }
];

export default function Dashboard() {
  const { data: session } = useSession();

  if (!session) return <Loader />

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
            >
              <Text color="purple.500" fontSize="lg" mb="4">Sessões da Semana</Text>
              <Chart options={optionsChart} series={series1} type="area" height={160} />
            </Box>
          </SimpleGrid>
        </Flex>
      </Container>
    </>
  );
}
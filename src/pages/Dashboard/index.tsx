import { Flex, Heading, Text, SimpleGrid, Box } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { Loader } from '../../components/Loader';
import { Sidebar } from '../../components/Sidebar';
import { Container } from "./styles";

import { theme } from '../../styles/theme';

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const options = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: true,
    },
    foreColor: theme.colors.purple[500],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    axisBorder: {
      color: theme.colors.purple[600]
    },
    axisTicks: {
      color: theme.colors.purple[600]
    },
    categories: [
      '03 Mar.',
      '04 Mar.',
      '05 Mar.',
      '06 Mar.',
      '07 Mar.',
      '08 Mar.',
    ],
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityForm: 0.7,
      opacityTo: 0.3,
    }
  }
};

const series1 = [
  { name: 'data1', data: [301, 120, 100, 26, 229, 220] }
];
const series2 = [
  { name: 'data2', data: [100, 30, 70, 9, 119, 130] }
];

export default function Dashboard() {
  const { data: session } = useSession();

  if (!session) {
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
          <Text fontSize="lg" color="gray.500" mt="4">| {session?.user.name}</Text>

          <SimpleGrid mt="6" w="100%" h="auto" gap="4" minChildWidth="320px">
            <Box
              p={["5", "8"]}
              bg="gray.800"
              borderRadius={8}
            >
              <Text color="purple.500" fontSize="lg" mb="4">Inscritos da Semana</Text>
              <Chart options={options} series={series1} type="area" height={160} />
            </Box>
            <Box
              p={["5", "8"]}
              bg="gray.800"
              borderRadius={8}
            >
              <Text color="purple.500" fontSize="lg" mb="4">Taxa de Abertura</Text>
              <Chart options={options} series={series2} type="area" height={160} />
            </Box>
          </SimpleGrid>
        </Flex>
      </Container>
    </>
  );
}
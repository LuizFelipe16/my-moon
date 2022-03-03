import { Flex, Icon, Text } from "@chakra-ui/react";
import { GiSandsOfTime } from 'react-icons/gi';

type TimerItem = {
  id: string;
  name: string;
  description: string;
  created_at: string;
}

interface ITimerItemComponentProps {
  timer: TimerItem;
}

function TimerItemComponent({ timer }: ITimerItemComponentProps) {
  return (
    <Flex
      w="16rem"
      h="15rem"
      p="6"
      bg="gray.800"
      color="purple.400"
      borderWidth={2}
      borderColor="purple.400"
      borderRadius="lg"
      justify="center"
      direction="column"
      position="relative"
      transition="0.2s"
      _hover={{
        boxShadow: 'lg',
        bg: 'purple.500',
        color: 'gray.100'
      }}
    >
      <Icon as={GiSandsOfTime} position="absolute" right="6" top="6" fontSize="4xl" />
      <Text fontSize="4xl" fontWeight="bold">{timer.name}</Text>
    </Flex>
  );
}

export { TimerItemComponent };
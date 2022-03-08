import { Flex, Image, Text, Heading } from "@chakra-ui/react";

interface IHomeCardProps {
  src: string;
  title: string;
  text: string;
}

function HomeCard({ src, text, title }: IHomeCardProps) {
  return (
    <Flex
      w="28rem"
      h="11rem"
      p="3"
      bg="gray.900"
      boxShadow="dark-lg"
      borderRadius="full"
      position="relative"
      transition="0.2s"
      _hover={{ bg: 'gray.700' }}
    >
      <Flex
        w="100%"
        h="100%"
        p="10"
        bg="gray.900"
        borderWidth="2px"
        borderColor="purple.400"
        borderRadius="full"
        align="flex-start" justify="center"
        direction="column"
      >
        <Image
          w="10rem"
          // h="10rem"
          objectFit="cover"
          src={src}
          alt="Pop"
          position="absolute"
          right="-16"
        />
        <Heading mb="2" color="purple.400">{title}</Heading>
        <Text>{text}</Text>
      </Flex>
    </Flex>
  );
}

export { HomeCard };
import { VStack, Image, Text, Heading, Box, Button } from "@chakra-ui/react";
import Link from "next/link";

interface IPostCardProps {
  src: string;
  title: string;
  text: string;
  href: string;
}

function PostCard({ src, text, title, href }: IPostCardProps) {
  return (
    <VStack
      w="21rem"
      h="25rem"
      bg="purple.400"
      borderRadius="xl"
      boxShadow="dark-lg"
      p="4"
      spacing="2"
      align="flex-start"
      mt="2rem"
      mr="2rem"
    >
      <Box
        w="100%"
        h="10rem"
        overflow="hidden"
      >
        <Image
          w="100%"
          h="100%"
          src={src}
          objectFit="cover"
          borderRadius="xl"
        />
      </Box>
      <Heading fontSize="2xl">{title}</Heading>
      <Text fontSize="lg" overflow="hidden" flex="1" w="100%">{text}</Text>
      <Link href={href} passHref>
        <Button w="100%" colorScheme="purple">Ver Completo</Button>
      </Link>
    </VStack>
  );
}

export { PostCard };
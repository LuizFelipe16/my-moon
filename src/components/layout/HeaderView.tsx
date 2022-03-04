import { Heading, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { FaArrowLeft } from 'react-icons/fa';

interface IHeaderViewProps {
  title: string;
  href: string;
}

function HeaderView({ title, href }: IHeaderViewProps) {
  return (
    <HStack
      spacing="4"
    >
      <Link href={href} passHref>
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
      <Heading fontSize="5xl" color="purple.400">{title}</Heading>
    </HStack>
  );
}

export { HeaderView };
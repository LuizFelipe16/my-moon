import { memo } from 'react';
import { HStack, Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { ModalViewContentItem } from '../Modal/ViewContentItem.tsx';

type IContentItem = {
  id: string;
  title: string;
  description: string;
  date: string;
  date_formatted: string;
  season: number;
}

interface ContentItemComponentProps {
  content: IContentItem;
}

function ContentItemComponent({ content }: ContentItemComponentProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        w="100%"
        h="4rem"
        bgColor="purple.500"
        borderRadius="lg"
        p="4"
        mt="4"
        align="center"
        justify="space-between"
        flexDirection="row"
        key={content.id}
        transition="0.2s"
        _hover={{
          boxShadow: 'lg',
          marginRight: '-1'
        }}
      >
        <Text>{content.title}</Text>
        <HStack>
          <Text>{content.date_formatted}</Text>
          <Button colorScheme="purple" onClick={onOpen}>
            <FaExternalLinkAlt />
          </Button>
        </HStack>
      </Flex>

      <ModalViewContentItem
        item={content}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}

export const ContentItem = memo(ContentItemComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.content, nextProps.content);
});
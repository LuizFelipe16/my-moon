import { memo } from 'react';
import { Flex, Text } from '@chakra-ui/react';

interface IItemList {
  content: {
    id: string;
    title: string;
    description: string;
    date: string;
    date_formatted?: string;
  }
}

function ContentItemComponent({ content }: IItemList) {
  return (
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
      <Text>{content.date_formatted}</Text>
    </Flex>
  );
}

export const ContentItem = memo(ContentItemComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.content, nextProps.content);
});
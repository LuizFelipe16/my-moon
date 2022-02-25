import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  ModalFooter,
  Input,
  VStack,
  Icon,
} from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';

type ContentItem = {
  title: string;
  description: string;
  date: string;
  date_formatted?: string;
  id: string;
  season: number;
}

interface IViewContentItemProps {
  isOpen: boolean;
  onClose: () => void;

  item: ContentItem;
}

export const ModalViewContentItem = (
  {
    isOpen,
    onClose,
    item
  }: IViewContentItemProps
) => {
  return (
    <>
      <Modal isCentered size="xl" isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent bg="gray.900">
          <ModalHeader color="purple.400">{item.title}</ModalHeader>
          <ModalBody>
            <VStack spacing="2">
              <Input
                color="gray.50"
                variant="filled"
                bg="gray.700"
                p="6"
                disabled
                value={item.title}
                _hover={{
                  bg: 'gray.600'
                }}
              />
              <Input
                color="gray.50"
                variant="filled"
                bg="gray.700"
                disabled
                p="6"
                value={item.description}
                _hover={{
                  bg: 'gray.600'
                }}
              />
              <Input
                color="gray.50"
                variant="filled"
                bg="gray.700"
                disabled
                p="6"
                value={item.date_formatted}
                _hover={{
                  bg: 'gray.600'
                }}
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="purple"
              mr="2"
            >
              <Icon as={FaTrash} />
            </Button>
            <Button
              bg="gray.900"
              borderRadius="0.26rem"
              borderWidth="0.12rem"
              borderColor="purple.500"

              color="purple.500"
              fontSize="md"
              fontWeight="bold"

              transition="0.2s"

              _hover={{
                color: 'gray.100',
                bg: 'purple.500'
              }}

              onClick={onClose}
            >
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
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
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useMutation } from 'react-query';
import { api } from '../../../services/api';
import { queryClient } from '../../../services/queryClient';
import { ButtonCancel } from '../ButtonCancel';

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

  list_id: string;
  item: ContentItem;
}

export const ModalViewContentItem = (
  {
    isOpen,
    onClose,
    item,
    list_id
  }: IViewContentItemProps
) => {
  const toast = useToast();
  const [isLoadingDeleteContentItem, setIsLoadingDeleteContentItem] = useState(false);

  const deleteContentItem = useMutation(async (id: string) => {
    await api.delete(`/contents/item/${id}`)
      .then(response => {
        setIsLoadingDeleteContentItem(false);
        toast({ title: response.data.message, status: "success", duration: 5000 });
      })
      .catch(err => {
        toast({ title: 'Ocorreu um erro inesperado.', status: "error", duration: 5000 });
      });
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(`content-items-${list_id}`);
      onClose();
    }
  });

  async function handleDeleteContentItem(id: string) {
    setIsLoadingDeleteContentItem(true);
    await deleteContentItem.mutateAsync(id);
  }

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
              isLoading={isLoadingDeleteContentItem}
              onClick={() => handleDeleteContentItem(item.id)}
            >
              <Icon as={FaTrash} />
            </Button>
            <ButtonCancel onClose={onClose} text="Fechar" />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
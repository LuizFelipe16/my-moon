import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
} from '@chakra-ui/react';

interface IWarningDeleteListItemProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;

  onDeleteItem: () => void;
}

export const ModalWarningDeleteListItem = ({ isOpen, onClose, onDeleteItem, isLoading = false }: IWarningDeleteListItemProps) => {
  return (
    <>
      <Modal isCentered size="xl" isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent bg="gray.900">
          <ModalHeader color="purple.400" >Aviso</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="xl">Deseja deletar esse item permanentemente?</Text>
            <Button
              size="md"
              mt="4"
              w="100%"
              isLoading={isLoading}
              colorScheme="red"
              onClick={onDeleteItem}
            >
              Sim
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
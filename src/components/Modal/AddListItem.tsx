import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  VStack,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

interface IAddListItemProps {
  isOpen: boolean;
  onClose: () => void;

  children: ReactNode;
}

export const ModalAddListItem = ({ isOpen, onClose, children }: IAddListItemProps) => {
  return (
    <>
      <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="gray.900">
          <ModalHeader>Adicionar Item</ModalHeader>
          <ModalBody>
            {children}
          </ModalBody>

          <ModalFooter>
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
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
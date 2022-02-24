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

interface IAddContentItemProps {
  isOpen: boolean;
  onClose: () => void;

  children?: ReactNode;
}

export const ModalAddContentItem = ({ isOpen, onClose, children }: IAddContentItemProps) => {
  return (
    <>
      <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="gray.900">
          <ModalHeader>Adicionar</ModalHeader>
          <ModalBody>
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
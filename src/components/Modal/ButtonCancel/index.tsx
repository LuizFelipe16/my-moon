import { Button } from "@chakra-ui/react";

interface IButtonCancel {
  onClose: () => void;
  text?: string;
}

function ButtonCancel({ onClose, text }: IButtonCancel) {
  return (
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
      {!text ? 'Cancelar' : text}
    </Button>
  );
}

export { ButtonCancel }
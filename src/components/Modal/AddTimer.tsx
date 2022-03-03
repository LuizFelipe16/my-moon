import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  VStack,
  useToast
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import * as validate from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';

import { Input } from '../../components/Form/Input';

import { queryClient } from '../../services/queryClient';
import { api } from '../../services/api';
import { ButtonCancel } from './ButtonCancel';

interface IAddTimerProps {
  isOpen: boolean;
  onClose: () => void;

  children?: ReactNode;
}

type CreateTimerFormData = {
  name: string;
  description: string;
}

const createTimerFormSchema = validate.object().shape({
  name: validate.string().required("Nome é obrigatório").min(2, 'Mínimo 2 caracteres'),
  description: validate.string().required("Descrição é obrigatória").min(3, 'Mínimo 3 caracteres'),
});

export const ModalAddTimer = ({ isOpen, onClose }: IAddTimerProps) => {
  const toast = useToast();

  const createTimer = useMutation(async (item: CreateTimerFormData) => {
    await api.post("/timers", {
      ...item,
      created_at: new Date()
    }).then((response) => {
      toast({ title: response.data.message, status: "success", duration: 5000 });
    });
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('timers');
      reset();
    },
    onError: () => {
      toast({ title: "Ocorreu um erro inesperado", status: "error", duration: 5000 });
    }
  });

  const handleCreateNewTimer: SubmitHandler<CreateTimerFormData> = async (values) => {
    await createTimer.mutateAsync(values);
  };

  const {
    register,
    handleSubmit,
    formState,
    reset
  } = useForm<CreateTimerFormData>({
    resolver: yupResolver(createTimerFormSchema)
  });

  const errors = formState.errors;

  return (
    <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="gray.900">
        <ModalHeader>Adicionar Timer</ModalHeader>
        <ModalBody>
          <VStack as="form" spacing="4" onSubmit={handleSubmit(handleCreateNewTimer)}>
            <Input
              is="name"
              label="Nome"
              error={errors.name}
              {...register('name')}
            />
            <Input
              is="description"
              label="Descrição"
              error={errors.description}
              {...register('description')}
            />
            <Button
              w="100%"
              type="submit"
              colorScheme="purple"
              isLoading={formState.isSubmitting}
            >
              Salvar
            </Button>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <ButtonCancel onClose={onClose} />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
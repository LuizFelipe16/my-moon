import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  VStack,
  useToast,
} from '@chakra-ui/react';
import * as validateYup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { api } from '../../services/api';
import { Input } from '../Form/Input';
import { ButtonCancel } from './ButtonCancel';
import { useMutation } from 'react-query';
import { queryClient } from '../../services/queryClient';

interface IModalAddClockProps {
  isOpen: boolean;
  onClose: () => void;

  id: string;
}

type CreateClockFormData = {
  time: string;
  description: string;
  date: Date;
}

const createClockFormSchema = validateYup.object().shape({
  time: validateYup.string().required("Título é obrigatório").min(2, 'Mínimo 2 caracteres'),
  description: validateYup.string().required("Descrição é obrigatória").min(3, 'Mínimo 3 caracteres'),
  date: validateYup.date().required('Data é obrigatória')
});

export const ModalAddClock = ({ isOpen, onClose, id }: IModalAddClockProps) => {
  const toast = useToast();
  const {
    register,
    reset,
    formState,
    handleSubmit
  } = useForm<CreateClockFormData>({
    resolver: yupResolver(createClockFormSchema)
  });

  const errors = formState.errors;

  const createClock = useMutation(async (clock: CreateClockFormData) => {
    await api.post(`/timers/clocks/${id}`, {
      ...clock,
      title: clock.time
    }).then((response) => {
      toast({ title: response.data.message, status: "success", duration: 5000 });
    });
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(`clocks-timer-${id}`)
      reset();
    },
  })

  const handleCreateClock: SubmitHandler<CreateClockFormData> = async (clock) => {
    if (!id) {
      toast({ title: 'Timer não encontrado. Tente novamente', status: 'info', duration: 5000 });
      return;
    }

    await createClock.mutateAsync(clock);
  }

  return (
    <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="gray.900">
        <ModalHeader>Adicionar Clock</ModalHeader>
        <ModalBody>
          <VStack as="form" spacing="4" onSubmit={handleSubmit(handleCreateClock)}>
            <Input
              is="title"
              type="time"
              label="Tempo"
              error={errors.time}
              {...register('time')}
            />
            <Input
              is="description"
              label="Descrição"
              error={errors.description}
              {...register('description')}
            />
            <Input
              is="date"
              label="Data"
              type="date"
              error={errors.date}
              {...register('date')}
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
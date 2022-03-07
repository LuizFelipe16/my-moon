import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  ModalFooter,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useMutation } from 'react-query';
import * as validateYup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { queryClient } from '../../services/queryClient';
import { api } from '../../services/api';

import { Input } from '../Form/Input';
import { ButtonCancel } from './ButtonCancel';

type Clock = {
  id: string;
  description: string;
  date: string;
  date_formatted: string;
  hours: number;
  minutes: number;
  title: string;
}

interface IViewClockProps {
  isOpen: boolean;
  onClose: () => void;

  disabled?: boolean;
  clock: Clock;
  timer_id?: string;
}

type clockFormData = {
  title: string;
  description: string;
  date: string;
}

const clockFormSchema = validateYup.object().shape({
  title: validateYup.string().required("Tempo é obrigatório").min(2, 'Mínimo 2 caracteres'),
  description: validateYup.string().required("Descrição é obrigatória").min(3, 'Mínimo 3 caracteres'),
  date: validateYup.date().required('Data é obrigatória')
});

export const ModalViewClock = (
  {
    isOpen,
    onClose,
    disabled = true,
    clock,
    timer_id
  }: IViewClockProps
) => {
  const toast = useToast();
  const {
    register,
    formState,
    handleSubmit
  } = useForm<clockFormData>({
    resolver: yupResolver(clockFormSchema)
  });

  const errors = formState.errors;

  const editClock = useMutation(async (values: clockFormData) => {
    await api.put(`/timers/clocks/clock/${clock.id}`, values)
      .then(resp => {
        toast({ title: resp.data.message, status: "success", duration: 5000 });
      });
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(`clocks-timer-${timer_id}`);
      onClose();
    }
  });

  const handleEditClock: SubmitHandler<clockFormData> = async (clock) => {
    await editClock.mutateAsync(clock);
  }

  return (
    <Modal isCentered size="xl" isOpen={isOpen} onClose={onClose} >
      <ModalOverlay />
      <ModalContent bg="gray.900">
        <ModalHeader color="purple.400">Clock</ModalHeader>
        <ModalBody>
          <VStack as="form" onSubmit={handleSubmit(handleEditClock)} spacing="2">
            <Input
              is="title"
              label={clock.title}
              type={!!disabled ? 'text' : 'time'}
              disabled={disabled}
              error={errors.title}
              {...register('title')}
            />
            <Input
              is="description"
              label={clock.description}
              type="text"
              disabled={disabled}
              error={errors.description}
              {...register('description')}
            />
            <Input
              is="date"
              label={clock.date_formatted}
              type={!!disabled ? 'text' : 'date'}
              disabled={disabled}
              error={errors.date}
              {...register('date')}
            />
            {!disabled && (
              <Button
                type="submit"
                w="100%"
                colorScheme="purple"
              >
                Editar
              </Button>
            )}
          </VStack>
        </ModalBody>

        <ModalFooter>
          <ButtonCancel onClose={onClose} text="Fechar" />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
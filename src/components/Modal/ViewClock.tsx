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
  VStack,
  Icon,
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

type Clock = {
  id: string;
  description: string;
  date: string;
  date_formatted: string;
  hours: number;
  minutes: number;
  time: number;
}

interface IViewClockProps {
  isOpen: boolean;
  onClose: () => void;

  disabled?: boolean;
  clock: Clock;
}

type clockFormData = {
  time: string;
  description: string;
  date: Date;
}

const clockFormSchema = validateYup.object().shape({
  time: validateYup.string().required("Título é obrigatório").min(2, 'Mínimo 2 caracteres'),
  description: validateYup.string().required("Descrição é obrigatória").min(3, 'Mínimo 3 caracteres'),
  date: validateYup.date().required('Data é obrigatória')
});

export const ModalViewClock = (
  {
    isOpen,
    onClose,
    disabled = true,
    clock,
  }: IViewClockProps
) => {
  const {
    register,
    reset,
    formState,
    handleSubmit
  } = useForm<clockFormData>({
    resolver: yupResolver(clockFormSchema)
  });

  const errors = formState.errors;

  return (
    <Modal isCentered size="xl" isOpen={isOpen} onClose={onClose} >
      <ModalOverlay />
      <ModalContent bg="gray.900">
        <ModalHeader color="purple.400">Clock</ModalHeader>
        <ModalBody>
          <VStack spacing="2">
            <Input
              is="title"
              label="Tempo"
              type={!!disabled ? 'text' : 'time'}
              disabled={disabled}
              value={`${clock.hours}:${clock.minutes}`}
              error={errors.time}
              {...register('time')}
            />
            <Input
              is="description"
              label="Descrição"
              type="text"
              disabled={disabled}
              value={clock.description}
              error={errors.description}
              {...register('description')}
            />
            <Input
              is="date"
              label="Data"
              type={!!disabled ? 'text' : 'date'}
              disabled={disabled}
              value={clock.date_formatted}
              error={errors.date}
              {...register('date')}
            />
          </VStack>
        </ModalBody>

        <ModalFooter>
          <ButtonCancel onClose={onClose} text="Fechar" />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
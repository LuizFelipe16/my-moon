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
import { SubmitHandler, useForm } from 'react-hook-form';
import * as validateYup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '../Form/Input';
import { useMutation } from 'react-query';
import { queryClient } from '../../services/queryClient';
import { api } from '../../services/api';
import { SelectInput } from '../Form/SelectInput';
import { OptionSelect } from '../utils/OptionSelect';
import { ButtonCancel } from './ButtonCancel';

interface IAddContentItemProps {
  isOpen: boolean;
  onClose: () => void;

  id: string;
  seasons: Array<number>;
}

type CreateContentItemFormData = {
  title: string;
  description: string;
  date: string;
  season: number;
}

const createContentItemFormSchema = validateYup.object().shape({
  title: validateYup.string().required("Título é obrigatório").min(2, 'Mínimo 2 caracteres'),
  description: validateYup.string().required("Descrição é obrigatória").min(3, 'Mínimo 3 caracteres'),
  season: validateYup.number().required("Temporada é obrigatória"),
  date: validateYup.date().required('Data é obrigatória')
});

export const ModalAddContentItem = ({ isOpen, onClose, id, seasons }: IAddContentItemProps) => {
  const toast = useToast();
  const {
    register,
    reset,
    formState,
    handleSubmit
  } = useForm<CreateContentItemFormData>({
    resolver: yupResolver(createContentItemFormSchema)
  });

  const errors = formState.errors;

  const createContentItem = useMutation(async (item: CreateContentItemFormData) => {
    await api.post(`/contents/${id}`, {
      ...item
    }).then((response) => toast({ title: response.data.message, status: "success", duration: 5000 }));
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(`content-items-${id}`);
      reset();
    }
  });

  const handleCreateContentItem: SubmitHandler<CreateContentItemFormData> = async (values) => {
    if (!id) {
      toast({ title: 'Lista não encontrado. Tente novamente', status: 'info', duration: 5000 });
      return;
    }

    await createContentItem.mutateAsync(values);
  }

  return (
    <>
      <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="gray.900">
          <ModalHeader>Adicionar</ModalHeader>
          <ModalBody>
            <VStack as="form" spacing="4" onSubmit={handleSubmit(handleCreateContentItem)}>
              <Input
                is="title"
                label="Título"
                error={errors.title}
                {...register('title')}
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
              <SelectInput
                is="season"
                label="Temporada"
                error={errors.season}
                {...register('season')}
              >
                {seasons?.map(s => <OptionSelect key={s} v={s} />)}
              </SelectInput>
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
    </>
  );
}
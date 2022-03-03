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

import { useState } from 'react';

import * as validate from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Input } from '../../../components/Form/Input';

import { api } from '../../../services/api';

import { queryClient } from '../../../services/queryClient';
import { useMutation } from 'react-query';
import { FileInput } from '../../../components/Form/FileInput';
import { SelectInput } from '../../../components/Form/SelectInput';

import { OptionSelect } from '../../utils/OptionSelect';
import { ButtonCancel } from '../ButtonCancel';

interface IAddListItemProps {
  isOpen: boolean;
  onClose: () => void;

  children?: ReactNode;
}

type CreateItemListFormData = {
  image: any;
  name: string;
  description: string;
  seasons: number;
}

const createItemListFormSchema = validate.object().shape({
  name: validate.string().required("Nome é obrigatório").min(2, 'Mínimo 2 caracteres'),
  description: validate.string().required("Descrição é obrigatória").min(3, 'Mínimo 3 caracteres'),
  seasons: validate.number().required("Escolha a Quatidade de Temporadas")
});

export const ModalAddListItem = ({ isOpen, onClose, children }: IAddListItemProps) => {
  const toast = useToast();

  const [imageUrl, setImageUrl] = useState('');
  const [localImageUrl, setLocalImageUrl] = useState('');

  const createItem = useMutation(async (item: CreateItemListFormData) => {
    await api.post("/lists", {
      ...item,
      url: imageUrl,
      created_at: new Date()
    }).then((response) => {
      toast({ title: response.data.message, status: "success", duration: 5000 });
    });
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('items');
      reset();
      setLocalImageUrl('');
      setImageUrl('');
    },
    onError: () => {
      toast({ title: "Ocorreu um erro inesperado", status: "error", duration: 5000 });
    }
  });

  const handleCreateNewItemList: SubmitHandler<CreateItemListFormData> = async (values) => {
    if (!imageUrl) {
      toast({
        title: 'Imagem não adicionada',
        description: 'É preciso adicionar e aguardar o upload de uma imagem antes de realizar o cadastro.',
        status: 'info',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    await createItem.mutateAsync(values);
  };

  const {
    register,
    handleSubmit,
    formState,
    reset
  } = useForm<CreateItemListFormData>({
    resolver: yupResolver(createItemListFormSchema)
  });

  const errors = formState.errors;

  return (
    <>
      <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="gray.900">
          <ModalHeader>Adicionar Item</ModalHeader>
          <ModalBody>
            <VStack as="form" spacing="4" onSubmit={handleSubmit(handleCreateNewItemList)}>
              <FileInput
                is="image"
                setImageUrl={setImageUrl}
                localImageUrl={localImageUrl}
                setLocalImageUrl={setLocalImageUrl}
                error={errors.image}
                {...register('image')}
              />
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
              <SelectInput
                is="seasons"
                label="Temporadas"
                error={errors.seasons}
                {...register('seasons')}
              >
                <OptionSelect v={1} />
                <OptionSelect v={2} />
                <OptionSelect v={3} />
                <OptionSelect v={4} />
                <OptionSelect v={5} />
                <OptionSelect v={6} />
                <OptionSelect v={7} />
                <OptionSelect v={8} />
                <OptionSelect v={9} />
                <OptionSelect v={10} />
                <OptionSelect v={11} />
                <OptionSelect v={12} />
                <OptionSelect v={13} />
                <OptionSelect v={14} />
                <OptionSelect v={15} />
                <OptionSelect v={16} />
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
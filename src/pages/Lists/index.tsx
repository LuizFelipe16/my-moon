import { useEffect, useState } from 'react';
import { Flex, Heading, Button, useDisclosure, useToast, VStack, HStack } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import * as validate from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useItems } from '../../hooks/useItems';

import { Loader } from '../../components/Loader';
import { ModalAddListItem } from '../../components/Modal/AddListItem';
import { Sidebar } from '../../components/Sidebar';
import { Input } from '../../components/Form/Input';
import { ItemList } from '../../components/ItemList';

import { api } from '../../services/api';

import { Container } from "./styles";
import { queryClient } from '../../services/queryClient';
import { useMutation } from 'react-query';
import { FileInput } from '../../components/Form/FileInput';

interface IListItem {
  email: string;
  name: string;
  description: string;
  status?: string;
  // type?: string;
  ts: number;
  id: string;
}

type CreateItemListFormData = {
  image: any;
  name: string;
  description: string;
}

const createItemListFormSchema = validate.object().shape({
  name: validate.string().required("Nome é obrigatório").min(2, 'Mínimo 3 caracteres'),
  description: validate.string().required("Descrição é obrigatória").min(3, 'Mínimo 6 caracteres')
});

export default function Lists() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session } = useSession();
  const toast = useToast();

  const [imageUrl, setImageUrl] = useState('');
  const [localImageUrl, setLocalImageUrl] = useState('');

  const { data, isLoading, error, isFetching } = useItems(1);

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

  if (!session || !!isLoading) return <Loader />

  return (
    <>
      <Head><title>Listas | MyMoon</title></Head>
      <Container>
        <Sidebar />

        <Flex
          flex="1"
          h="100vh"
          p="10"
          flexDirection="column"
        >
          <Heading fontSize="5xl" color="purple.400">MyMoon</Heading>
          <Button
            onClick={onOpen}
            position="absolute"
            top="4rem"
            right="3rem"
            colorScheme="purple"
          >
            Adicionar a Lista
          </Button>

          <HStack
            w="100%"
            h="auto"
            mt="6"
            gap={2}
            flexWrap="wrap"
            overflowX="scroll"
          >
            {data?.items.map(item => (<ItemList key={item.id} item={item} />))}
          </HStack>
        </Flex>
      </Container>

      <ModalAddListItem
        isOpen={isOpen}
        onClose={onClose}
      >
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
          <Button
            w="100%"
            type="submit"
            colorScheme="purple"
            isLoading={formState.isSubmitting}
          >
            Salvar
          </Button>
        </VStack>
      </ModalAddListItem>
    </>
  );
}
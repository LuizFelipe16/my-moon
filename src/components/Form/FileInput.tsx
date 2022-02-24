import {
  Box,
  FormLabel,
  CircularProgress,
  CircularProgressLabel,
  Icon,
  Image,
  Text,
  FormControl,
  FormErrorMessage,
  Flex,
  useToast,
  Tooltip,
} from '@chakra-ui/react';
import axios, { AxiosRequestConfig, CancelTokenSource } from 'axios';
import {
  useState,
  SetStateAction,
  Dispatch,
  ForwardRefRenderFunction,
  forwardRef,
  useCallback,
  useEffect,
} from 'react';
import {
  FieldError,
  FieldValues,
  UseFormSetError,
  UseFormTrigger,
} from 'react-hook-form';
import { FiAlertCircle, FiPlus } from 'react-icons/fi';
import { api } from '../../services/api';

export interface FileInputProps {
  is: string;
  error?: FieldError;
  setImageUrl: Dispatch<SetStateAction<string>>;
  localImageUrl: string;
  setLocalImageUrl: Dispatch<SetStateAction<string>>;
  setError?: UseFormSetError<FieldValues>;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => Promise<boolean | void>;
  trigger?: UseFormTrigger<FieldValues>;
}

const FileInputBase: ForwardRefRenderFunction<
  HTMLInputElement,
  FileInputProps
> = (
  {
    is,
    error = null,
    setImageUrl,
    localImageUrl,
    setLocalImageUrl,
    setError,
    onChange,
    trigger,
    ...rest
  },
  ref
) => {
    const toast = useToast();
    const [progress, setProgress] = useState(0);
    const [isSending, setIsSending] = useState(false);
    const [cancelToken, setCancelToken] = useState<CancelTokenSource>(
      {} as CancelTokenSource
    );

    const handleImageUpload = useCallback(
      async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
        if (!event.target.files?.length) {
          return;
        }

        setImageUrl('');
        setLocalImageUrl('');

        setIsSending(true);

        await onChange(event);

        const formData = new FormData();

        formData.append(event.target.name, event.target.files[0]);
        formData.append('key', String(process.env.NEXT_PUBLIC_IMGBB_API_KEY));

        const config = {
          headers: { 'content-type': 'multipart/form-data' },
          onUploadProgress: (e: ProgressEvent) => {
            setProgress(Math.round((e.loaded * 100) / e.total));
          },
        } as AxiosRequestConfig;

        try {
          const response = await api.post(
            'https://api.imgbb.com/1/upload',
            formData,
            config
          );

          setImageUrl(response.data.data.url);
          setLocalImageUrl(URL.createObjectURL(event.target.files[0]));
        } catch (err) {
          if (err?.message === 'Cancelled image upload.') return;

          toast({
            title: 'Falha no envio',
            description: 'Ocorreu um erro ao realizar o upload da sua imagem.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        } finally {
          setIsSending(false);
          setProgress(0);
        }
      },
      [onChange, setImageUrl, setLocalImageUrl, toast]
    );

    return (
      <FormControl isInvalid={!!error}>
        <FormLabel
          mx="auto"
          w={40}
          h={40}
          htmlFor={is}
          cursor={isSending ? 'progress' : 'pointer'}
          opacity={isSending ? 0.5 : 1}
        >
          {localImageUrl && !isSending ? (
            <Image
              w="full"
              h="full"
              src={localImageUrl}
              alt="Uploaded photo"
              borderRadius="md"
              objectFit="cover"
            />
          ) : (
            <Flex
              w="full"
              h="full"
              flexDir="column"
              justifyContent="center"
              alignItems="center"
              p="4"
              borderRadius="md"
              bgColor="gray.800"
              color="purple.500"
              borderWidth={error?.message && 2}
              borderColor={error?.message && 'red.500'}
            >
              {isSending ? (
                <>
                  <CircularProgress
                    trackColor="gray.200"
                    value={progress}
                    color="purple.500"
                  >
                    <CircularProgressLabel>{progress}%</CircularProgressLabel>
                  </CircularProgress>
                  <Text as="span" pt={2} textAlign="center">
                    Enviando...
                  </Text>
                </>
              ) : (
                <Box pos="relative" h="full">
                  <Flex
                    h="full"
                    alignItems="center"
                    justifyContent="center"
                    flexDir="column"
                  >
                    <Icon as={FiPlus} w={14} h={14} />
                    <Text as="span" pt={2} textAlign="center">
                      Adicione sua imagem
                    </Text>
                  </Flex>
                </Box>
              )}
            </Flex>
          )}
          <input
            data-testid={is}
            disabled={isSending}
            id={is}
            name={is}
            onChange={handleImageUpload}
            ref={ref}
            type="file"
            style={{
              display: 'none',
            }}
            {...rest}
          />
        </FormLabel>
      </FormControl>
    );
  };

export const FileInput = forwardRef(FileInputBase);
import { FormControl, FormErrorMessage, FormLabel, Input as CInput, InputProps as CInputProps } from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";

interface InputProps extends CInputProps {
  is: string;
  label?: string;
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps>
  = ({ label, is, error = null, ...rest }, ref) => {
    return (
      <FormControl isInvalid={!!error}>
        {/* {!!label && (<FormLabel color="purple.400" htmlFor={is}>{label}</FormLabel>)} */}

        <CInput
          id={is}
          name={is}
          placeholder={label}
          focusBorderColor="purple.500"
          bgColor="gray.700"
          variant="filled"
          _hover={{
            bgColor: 'gray.700'
          }}
          borderRadius={4}
          p="6"
          ref={ref}
          {...rest}
        />

        {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      </FormControl>
    );
  }

export const Input = forwardRef(InputBase);
import { FormControl, FormErrorMessage, FormLabel, Select as CSelect, SelectProps as CSelectProps } from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction, ReactNode } from "react";
import { FieldError } from "react-hook-form";

interface SelectInputProps extends CSelectProps {
  is: string;
  label?: string;
  error?: FieldError;

  children: ReactNode;
}

const SelectInputBase: ForwardRefRenderFunction<HTMLSelectElement, SelectInputProps>
  = ({ label, is, children, error = null, ...rest }, ref) => {
    return (
      <FormControl isInvalid={!!error}>
        {/* {!!label && (<FormLabel color="purple.400" htmlFor={is}>{label}</FormLabel>)} */}

        <CSelect
          id={is}
          name={is}
          placeholder={label}
          focusBorderColor="purple.500"
          bg="gray.700"
          color="white"
          borderColor="gray.700"
          variant="filled"
          borderRadius={4}
          // p="6"
          ref={ref}
          {...rest}
          _hover={{
            bg: 'gray.700'
          }}
        >
          {children}
        </CSelect>

        {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      </FormControl>
    );
  }

export const SelectInput = forwardRef(SelectInputBase);
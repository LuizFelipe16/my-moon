import { useState } from "react";
import { Button, Flex, Heading, Icon, Text, useDisclosure, useToast } from "@chakra-ui/react";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useMutation } from "react-query";

import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";

import { MenuContentStyled, MenuItemStyled } from "./styles";
import { ModalViewClock } from "../Modal/ViewClock";

type Clock = {
  id: string;
  title: string;
  description: string;
  date: string;
  date_formatted: string;
  hours: number;
  minutes: number;
  time: number;
}

interface IClockComponentProps {
  timer_id: string;
  clock: Clock;
}

function ClockComponent({ clock, timer_id }: IClockComponentProps) {
  const toast = useToast();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalEditClockOpenOrClose, setIsModalEditClockOpenOrClose] = useState(false);
  const modalEditClockOpenOrClose = () => setIsModalEditClockOpenOrClose(!isModalEditClockOpenOrClose);

  const deleteClock = useMutation(async () => {
    await api.delete(`/timers/clocks/clock/${clock.id}`)
      .then(resp => {
        toast({ title: resp.data.message, status: "success", duration: 5000 });
      });
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(`clocks-timer-${timer_id}`);
    }
  });

  async function handleDeleteClock() { await deleteClock.mutateAsync() }

  return (
    <>
      <Flex
        key={clock.id}
        w="13rem"
        h="15rem"
        bg="purple.400"
        p="4"
        pb="8"
        borderRadius="md"
        direction="column"
        justify="space-between"
        position="relative"
      >
        <Flex align="center">
          <Heading fontSize="8xl">{clock.hours}</Heading>
          <Text fontSize="5xl">/{clock.minutes}</Text>
        </Flex>
        <Text fontSize="2xl">{clock.date_formatted}</Text>

        <DropdownMenu.Root open={isMenuOpen} onOpenChange={() => setIsMenuOpen(!isMenuOpen)}>
          <DropdownMenu.Trigger asChild>
            <Button
              w="2.5rem"
              h="2.5rem"
              colorScheme="purple"
              bg="transparent"
              position="absolute"
              top="0"
              right="0"
              p="0"
              m="0"
            >
              <Icon as={GiHamburgerMenu} aria-label="Menu" />
            </Button>
          </DropdownMenu.Trigger>

          <MenuContentStyled sideOffset={5}>
            <MenuItemStyled onClick={handleDeleteClock}>Excluir</MenuItemStyled>
            <MenuItemStyled onClick={modalEditClockOpenOrClose}>Editar</MenuItemStyled>
            <MenuItemStyled onClick={onOpen}>Ver Completo</MenuItemStyled>
          </MenuContentStyled>
        </DropdownMenu.Root>
      </Flex>

      <ModalViewClock
        isOpen={isOpen}
        onClose={onClose}
        disabled={true}
        clock={clock}
      />
      <ModalViewClock
        isOpen={isModalEditClockOpenOrClose}
        onClose={modalEditClockOpenOrClose}
        disabled={false}
        clock={clock}
        timer_id={timer_id}
      />
    </>
  );
}

export { ClockComponent };
import { Button, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useState } from "react";
import { GiHamburgerMenu } from 'react-icons/gi';

import { MenuContentStyled, MenuItemStyled } from "./styles";

type Clock = {
  id: string;
  title: string;
  description: string;
  date: Date;
  date_formatted: string;
  hours: number;
  minutes: number;
  time: number;
}

interface IClockComponentProps {
  clock: Clock;
}

function ClockComponent({ clock }: IClockComponentProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
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
          <MenuItemStyled>Excluir</MenuItemStyled>
          <MenuItemStyled>Ver Completo</MenuItemStyled>
        </MenuContentStyled>
      </DropdownMenu.Root>
    </Flex>
  );
}

export { ClockComponent };
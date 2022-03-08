import { Button, Icon } from "@chakra-ui/react";
import { FaArrowUp } from 'react-icons/fa';
import { animateScroll } from 'react-scroll';

function ScrollTopButton() {
  return (
    <Button
      position="fixed"
      bottom="10"
      right="10"
      boxShadow="dark-lg"
      borderRadius="full"
      colorScheme="purple"
      onClick={() => animateScroll.scrollToTop({ duration: 1000 })}
    >
      <Icon as={FaArrowUp} />
    </Button>
  );
}

export { ScrollTopButton };
import { HStack } from "@chakra-ui/react";
import Link from "next/link";

import { Alink } from "./styles";

function Navigation() {
  return (
    <HStack spacing="12" pl="20" w="100vw" h="13vh" position="absolute" top="0">
      <Alink>🌙 MyMoon</Alink>
      <Link href="/"><Alink className="nav_link">Home</Alink></Link>
      <Link href="/Blog"><Alink className="nav_link">Nosso Blog</Alink></Link>
      <Link href="/Login"><Alink className="nav_link">Plataforma</Alink></Link>
    </HStack>
  );
}

export { Navigation };
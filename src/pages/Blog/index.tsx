import { Stack, Heading, Text, Button, Icon, HStack, Flex, VStack } from "@chakra-ui/react";
import Head from "next/head";

import { Footer } from "../../components/layout/Footer";
import { ScrollTopButton } from "../../components/layout/ScrollTopButton";

export default function Blog() {
  return (
    <>
      <Head><title>Blog | MyMoon</title></Head>

      <Footer />
    </>
  );
}
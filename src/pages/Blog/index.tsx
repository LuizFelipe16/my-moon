import { Box, Heading, Text, Image, Icon, HStack, Flex, VStack } from "@chakra-ui/react";
import Head from "next/head";

import { Footer } from "../../components/layout/Footer";
import { Navigation } from "../../components/layout/Navigation";
import { ScrollTopButton } from "../../components/layout/ScrollTopButton";
import { PostCard } from "../../components/Post";

import { Blog as BlogStyled } from '../../styles/pages/blog';

export default function Blog() {
  return (
    <>
      <Head><title>Blog | MyMoon</title></Head>
      <Navigation />
      <BlogStyled>
        <PostCard
          src="/blog.jpg"
          title="Pessoas Produtivas na Noite"
          text="O profissional noctívago sempre foi visto pelos empregadores como uma alternativa insegura, pois os hábitos noturnos supostamente afetariam a sua produtividade. Recentemente, muitos estudos têm voltado a atenção para os noctívagos sob uma perspectiva nova, principalmente pela expansão do ‘’universo da internet’’."
        />
      </BlogStyled>
      <ScrollTopButton />
      <Footer />
    </>
  );
}
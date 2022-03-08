import { useState } from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import Prismic from '@prismicio/client';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { Footer } from "../../components/layout/Footer";
import { Navigation } from "../../components/layout/Navigation";
import { ScrollTopButton } from "../../components/layout/ScrollTopButton";
import { PostCard } from "../../components/Post";

import { getPrismicClient } from "../../services/prismic";

import { Blog as BlogStyled } from '../../styles/pages/blog';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
    banner: {
      url: string;
    };
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
  preview?: boolean;
}

export default function Blog({ postsPagination, preview }: HomeProps) {
  const [posts, setPosts] = useState(postsPagination.results);

  return (
    <>
      <Head><title>Blog | MyMoon</title></Head>
      <Navigation />
      <BlogStyled>
        {posts?.map(post => (
          <PostCard
            key={post.uid}
            href={`/Blog/post/${post.uid}`}
            src={post.data.banner.url}
            title={post.data.title}
            text={post.data.subtitle}
          />
        ))}
      </BlogStyled>
      <ScrollTopButton />
      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({
  preview = false,
  previewData
}) => {
  const prismic = getPrismicClient();

  const postsResponse = await prismic.query([
    Prismic.Predicates.at('document.type', 'posts')
  ], {
    pageSize: 20,
  });

  const posts = postsResponse?.results?.map(post => {
    return {
      uid: post.uid,
      first_publication_date: format(
        new Date(String(post.first_publication_date)),
        "d MMM yyyy",
        { locale: ptBR }
      ),
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        banner: {
          url: post.data.banner.url
        }
      }
    }
  });

  return {
    props: {
      postsPagination: {
        next_page: postsResponse.next_page,
        results: posts
      },
      preview
    }
  }
};
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Prismic from '@prismicio/client';
import { useRouter } from 'next/router';
import { FiUser, FiCalendar } from 'react-icons/fi';

import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { getPrismicClient } from '../../../services/prismic';

import { Navigation } from '../../../components/layout/Navigation';
import { Footer } from '../../../components/layout/Footer';

import { PostStyled } from '../../../styles/pages/post';

interface Post {
  last_publication_date: string | null;
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: Record<string, unknown>[];
    }[];
  };
}

interface PostProps {
  post: Post;
  preview?: boolean;
}

export default function Post({ post, preview }: PostProps) {
  const router = useRouter();

  const HtmlSerializer = (type: string, text: string) => {
    if (type === 'paragraph') {
      return (
        <p key={text} className="paragraph">{text}</p>
      );
    }

    if (type === 'list-item') {
      return (
        <li key={text} className="list-item">{text}</li>
      );
    }

    return null;
  }

  function Comments() {
    return (
      <section
        style={{ width: '100%' }}
        ref={
          element => {
            if (!element) {
              return
            }

            const scriptElement = document.createElement('script')
            scriptElement.setAttribute('src', 'https://utteranc.es/client.js')
            scriptElement.setAttribute('repo', 'LuizFelipe16/spaceblog-comments')
            scriptElement.setAttribute('issue-term', 'pathname')
            scriptElement.setAttribute('theme', 'photon-dark')
            scriptElement.setAttribute('crossorigin', 'anonymous')
            scriptElement.setAttribute('async', 'true')
            element.replaceChildren(scriptElement)
          }
        }
      />
    );
  }

  if (router.isFallback) {
    return <h1>Carregando...</h1>
  }

  return (
    <>
      <Head><title>{post.data.title} | MyMoon</title></Head>
      <PostStyled>
        <Navigation />

        <img className="banner" src={`${post.data.banner.url}`} alt="Banner" />

        <article className="post">
          <h1>{post.data.title}</h1>

          <div className="info">
            <div>
              <FiCalendar />
              <time>
                {post.first_publication_date}
              </time>
            </div>
            <div>
              <FiUser />
              <span>{post.data.author}</span>
            </div>
            {
              !!post.last_publication_date && (
                <p className="last_publication_date">{post.last_publication_date}</p>
              )
            }
          </div>

          {post.data.content.map(content => {
            return (
              <div key={content.heading} className="content">
                <h1>{content.heading}</h1>
                {content.body.map((element: any) => HtmlSerializer(element.type, element.text))}
              </div>
            )
          })}
        </article>

        {Comments()}
      </PostStyled>
      <Footer />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();

  const postsResponse = await prismic.query([
    Prismic.Predicates.at('document.type', 'posts')
  ], {
    pageSize: 5
  });

  const paths = postsResponse?.results?.map(post => ({
    params: { slug: post.uid },
  }));

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async ({ params, preview = false, previewData }) => {
  const prismic = getPrismicClient();

  const slug = params?.slug;

  const response = await prismic.getByUID('posts', String(slug), {
    ref: '',
  });

  const post = {
    uid: response.uid,
    last_publication_date: format(
      new Date(response?.last_publication_date),
      "'* editado em' d MMM yyyy', ás' KK':'mm",
      { locale: ptBR }
    ),
    first_publication_date: format(
      new Date(String(response.first_publication_date)),
      "d MMM yyyy",
      { locale: ptBR }
    ),
    data: {
      title: response.data.title,
      subtitle: response.data.subtitle,
      banner: {
        url: response.data.banner.url
      },
      author: response.data.author,
      content: response.data.content.map(content => ({
        heading: content.heading,
        body: content.body
      }))
    }
  }

  return {
    props: {
      post,
      preview
    }
  }
};
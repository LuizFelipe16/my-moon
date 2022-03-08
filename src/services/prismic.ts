import * as prismic from '@prismicio/client';

export const getPrismicClient = prismic.createClient(
  String(process.env.PRISMIC_API_ENDPOINT),
  {
    accessToken: String(process.env.PRISMIC_ACCESS_TOKEN),
  }
);
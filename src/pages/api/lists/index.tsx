import { query as q } from 'faunadb';

import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { fauna } from '../../../services/fauna';

interface ListsQueryResponse {
  after?: {
    id: string;
  };
  data: {
    data: {
      name: string;
      description: string;
      url: string;
      seasons: number;
    };
    ts: number;
    ref: {
      id: string;
    };
  }[];
}

const MethodsLists = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const session = await getSession({ req });
    const {
      name,
      description,
      url,
      seasons,
      created_at
    } = req.body;

    const data = {
      email: session?.user.email,
      name,
      description,
      url,
      status: false,
      seasons,
      created_at
    }

    await fauna.query(
      q.Create(
        q.Collection('lists'),
        { data }
      ),
    );

    return res.status(201).json({ message: 'Item criado com sucesso.' });
  }

  if (req.method === 'GET') {
    const session = await getSession({ req });

    if (session) {
      return await fauna.query<ListsQueryResponse>(
        q.Map(
          q.Paginate(
            q.Match(q.Index("lists_by_email"), session?.user?.email)
          ),
          q.Lambda("X", q.Get(q.Var("X")))
        )
      ).then(response => {
        const formattedData = response.data.map(item => ({
          ...item.data,
          ts: item.ts,
          id: item.ref.id,
        }));

        return res.status(200)
          .setHeader('Content-Type', 'application/json')
          .json({
            data: formattedData,
          });
      }).catch(err => {
        return res.status(400)
          .setHeader('Content-Type', 'application/json')
          .json(err);
      });
    } else {
      return res.status(400)
        .setHeader('Content-Type', 'application/json')
        .json({
          error: "Faça Login novamente para continuar"
        });
    }
  }

  return res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
}

export default MethodsLists;
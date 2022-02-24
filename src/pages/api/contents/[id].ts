import { query as q } from 'faunadb';

import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { fauna } from '../../../services/fauna';

interface ContentsQueryResponse {
  after?: {
    id: string;
  };
  data: {
    data: {
      name: string;
      description: string;
      date: string;
    };
    ts: number;
    ref: {
      id: string;
    };
  }[];
}

const ContentsMethods = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { id } = req.query;
    const session = await getSession({ req });

    if (!session) {
      return res.status(400).json({
        error: 'Sua sessão está inativa, faça login novamente para continuar.'
      });
    }

    try {
      const {
        title,
        description,
        date
      } = req.body;

      const data = {
        email: session?.user.email,
        list_item_id: id,
        title,
        description,
        date
      }

      await fauna.query(
        q.Create(
          q.Collection('contents'),
          { data }
        ),
      );

      return res.status(201).json({ message: 'Item criado com sucesso.' });
    } catch (err) {
      return res.status(400).json({
        error: 'Um erro inesperado aconteceu. Tente novamente mais tarde.'
      });
    }
  }

  if (req.method === 'GET') {
    const { id } = req.query;
    const session = await getSession({ req });

    if (session) {
      return await fauna.query<ContentsQueryResponse>(
        q.Map(
          q.Paginate(
            q.Match(q.Index("contents_by_list_item_id"), id)
          ),
          q.Lambda("X", q.Get(q.Var("X")))
        )
      ).then(response => {
        const formattedData = response.data.map(item => ({
          ...item.data,
          ts: item.ts,
          id: item.ref.id,
        }));

        return res.status(200).json({
          data: formattedData,
        });
      }).catch(err => {
        return res.status(400).json(err);
      });
    } else {
      return res.status(400).json({
        error: "Faça Login novamente para continuar"
      });
    }
  }

  return res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
}

export default ContentsMethods;
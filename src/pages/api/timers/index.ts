import { query as q } from 'faunadb';

import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { fauna } from '../../../services/fauna';

interface TimersQueryResponse {
  after?: {
    id: string;
  };
  data: {
    data: {
      name: string;
      description: string;
    };
    ts: number;
    ref: {
      id: string;
    };
  }[];
}

const MethodsTimers = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const session = await getSession({ req });

    const {
      name,
      description,
      created_at
    } = req.body;

    const data = {
      email: session?.user.email,
      name,
      description,
      created_at
    }

    await fauna.query(
      q.Create(
        q.Collection('timers'),
        { data }
      ),
    );

    return res.status(201).json({ message: 'Timer criado com sucesso.' });
  }

  if (req.method === 'GET') {
    const session = await getSession({ req });

    if (session) {
      return await fauna.query<TimersQueryResponse>(
        q.Map(
          q.Paginate(
            q.Match(q.Index("timers_by_email"), session?.user?.email)
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

export default MethodsTimers;
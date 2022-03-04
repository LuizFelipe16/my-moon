import { NextApiRequest, NextApiResponse } from "next";
import { query as q } from 'faunadb';

import { fauna } from '../../../../services/fauna';

interface TimerQueryResponse {
  data: {
    data: {
      name: string;
      description: string;
    };
    ts: number;
    ref: {
      id: string;
    };
  };
}

const MethodsTimer = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { id } = req.query;

    await fauna.query<any>(
      q.Get(q.Ref(q.Collection('timers'), id))
    ).then(response => {

      const timer = {
        ...response.data,
        id: response.ref.id
      }

      return res.status(200)
        .setHeader('Content-Type', 'application/json')
        .json({
          item: timer
        })
    }).catch(err => {
      return res.status(400)
        .setHeader('Content-Type', 'application/json')
        .json(err);
    });
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;

    try {
      await fauna.query(
        q.Delete(q.Ref(q.Collection("timers"), id))
      );

      return res.status(200).json({
        message: 'Timer deletado.'
      });
    } catch {
      return res.status(400).json({
        error: 'Ocorreu um erro inesperado.'
      });
    }
  }

  return res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
}

export default MethodsTimer;
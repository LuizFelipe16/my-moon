import { query as q } from 'faunadb';

import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { fauna } from '../../../../services/fauna';

interface ClocksQueryResponse {
  data: {
    data: {
      name: string;
      description: string;
      date: string;
      hours: number;
      minutes: number;
      time: number;
    };
    ts: number;
    ref: {
      id: string;
    };
  }[];
}

const MethodsClocks = async (req: NextApiRequest, res: NextApiResponse) => {
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
        date,
      } = req.body;

      const [hours, minutes] = title.split(":");

      const time = (Number(hours) * 60 * 60) + (Number(minutes) * 60);

      const data = {
        email: session?.user.email,
        timer_id: id,
        title,
        description,
        date,
        hours: Number(hours),
        minutes: Number(minutes),
        time
      }

      await fauna.query(
        q.Create(
          q.Collection('clocks'),
          { data }
        ),
      );

      return res.status(201)
        .setHeader('Content-Type', 'application/json')
        .json({ message: 'Clock criado com sucesso.' });
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
      return await fauna.query<ClocksQueryResponse>(
        q.Map(
          q.Paginate(
            q.Match(q.Index("clocks_by_timer_id"), id)
          ),
          q.Lambda("X", q.Get(q.Var("X")))
        )
      ).then(response => {
        const formattedData = response.data.map(item => ({
          ...item.data,
          date_formatted: format(
            new Date(item.data.date),
            "d 'de' MMM",
            { locale: ptBR }
          ),
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

export default MethodsClocks;
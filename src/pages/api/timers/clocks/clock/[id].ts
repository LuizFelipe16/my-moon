import { NextApiRequest, NextApiResponse } from "next";
import { query as q } from 'faunadb';
import { getSession } from "next-auth/react";

import { fauna } from '../../../../../services/fauna';

const MethodsClock = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'DELETE') {
    const { id } = req.query;

    try {
      await fauna.query(
        q.Delete(q.Ref(q.Collection("clocks"), id))
      );

      return res.status(200).json({
        message: 'Clock deletado com sucesso.'
      });
    } catch {
      return res.status(400).json({
        error: 'Ocorreu um erro inesperado.'
      });
    }
  }

  if (req.method === 'PUT') {
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
        title,
        description,
        date,
        hours: Number(hours),
        minutes: Number(minutes),
        time
      }

      await fauna.query(
        q.Update(
          q.Ref(q.Collection("clocks"), id),
          { data }
        ),
      );

      return res.status(201)
        .setHeader('Content-Type', 'application/json')
        .json({ message: 'Clock editado com sucesso.' });
    } catch (err) {
      return res.status(400).json({
        error: 'Um erro inesperado aconteceu. Tente novamente mais tarde.'
      });
    }
  }

  return res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
}

export default MethodsClock;
import { NextApiRequest, NextApiResponse } from "next";
import { query as q } from 'faunadb';

import { fauna } from '../../../../services/fauna';

const MethodsContentItem = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'DELETE') {
    const { id } = req.query;

    try {
      await fauna.query(
        q.Delete(q.Ref(q.Collection("contents"), id))
      );

      return res.status(200).json({
        message: 'Item deletado com sucesso.'
      });
    } catch {
      return res.status(400).json({
        error: 'Ocorreu um erro inesperado.'
      });
    }
  }

  return res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
}

export default MethodsContentItem;
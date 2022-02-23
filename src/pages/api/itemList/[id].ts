import { NextApiRequest, NextApiResponse } from "next";
import { query as q } from 'faunadb';

import { fauna } from '../../../services/fauna';

const addItemLists = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { id } = req.query;

    await fauna.query(
      q.Get(q.Ref(q.Collection('lists'), id))
    ).then(response => {

      return res.status(200).json({
        item: response
      });
    }).catch(err => {
      return res.status(400).json(err);
    });
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;

    try {
      await fauna.query(
        q.Delete(q.Ref(q.Collection("lists"), id))
      );

      return res.status(200).json({
        message: 'Item deletado.'
      });
    } catch {
      return res.status(400).json({
        error: 'Ocorreu um erro inesperado.'
      });
    }
  }

  return res.status(400).json({
    error: 'Method not allowed!'
  });
}

export default addItemLists;
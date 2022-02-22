import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async (request, response) => {
  const session = await getSession({ request });

  if (session) {
    response.status(201).json({
      message: 'Acesso com Sucesso ao conteúdo protegido.'
    });
  } else {
    response.status(201).json({
      message: 'Conteúdo protegido! Faça Login para acessar!'
    });
  }
}
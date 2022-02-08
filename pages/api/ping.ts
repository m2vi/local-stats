import api from '@utils/backend/main';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { ip } = Object.freeze(req.query);

  res.status(200).json(await api.ping(ip?.toString()));
}

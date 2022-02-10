import coingecko from '@utils/backend/coingecko/main';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(await coingecko.widget());
}

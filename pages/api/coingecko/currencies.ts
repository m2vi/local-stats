import coingecko from '@utils/backend/coingecko/main';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { ids } = Object.freeze(req.query) as any;

    res.status(200).json(await coingecko.currencies(ids.toString().split(',')));
  } catch (error: any) {
    res.status(500).json({ error: error?.message });
  }
}

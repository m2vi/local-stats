import scoresaber from '@utils/backend/scoresaber/main';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(await scoresaber.widget());
}

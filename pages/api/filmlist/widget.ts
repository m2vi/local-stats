import filmlist from '@utils/backend/filmlist/main';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(await filmlist.widget());
}

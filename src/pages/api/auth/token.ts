import type { NextApiRequest, NextApiResponse } from 'next';
import { getTokenFromCookies } from '@/utils/auth';

type TokenResponse = {
  token?: string;
  error?: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<TokenResponse>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = getTokenFromCookies(req);

  if (!token) {
    return res.status(401).json({ error: 'No token found' });
  }

  return res.status(200).json({ token });
}

import { NextApiRequest } from 'next';
import { ACCESS_TOKEN_COOKIE_NAME } from './consts';

export function getTokenFromCookies(req: NextApiRequest): string | null {
  const token = req.cookies[ACCESS_TOKEN_COOKIE_NAME];
  return token || null;
}

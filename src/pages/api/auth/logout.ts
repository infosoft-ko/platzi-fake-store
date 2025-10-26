import type { NextApiRequest, NextApiResponse } from 'next';
import {
  ACCESS_TOKEN_COOKIE_NAME,
  getLogoutTokenCookieString,
} from '@/utils/auth';
import { isSecureConnection } from '@/utils/server';

type LogoutResponse = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<LogoutResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const cookieString = getLogoutTokenCookieString(isSecureConnection(req));

  return res
    .status(200)
    .setHeader('Set-Cookie', cookieString)
    .json({ message: 'Logged out successfully' });
}
